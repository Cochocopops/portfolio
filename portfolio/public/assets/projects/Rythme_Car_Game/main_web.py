# Version web complète et optimisée - Compatible Pygbag
import asyncio
import pygame
import random
import csv
import os
from datetime import datetime

# Initialize Pygame
pygame.init()

# Screen dimensions
WIDTH, HEIGHT = 444, 790
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Rythme Car Game")

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
ORANGE = (255, 152, 0)
GRAY = (100, 100, 100)
BACKGROUND = (30, 30, 30)
DARK_ORANGE = (200, 100, 0)

# Game variables
clock = pygame.time.Clock()
FPS = 60

def load_gif_frames(path):
    """Load all frames from a GIF using PIL"""
    try:
        from PIL import Image
        gif = Image.open(path)
        frames = []
        
        try:
            while True:
                frame = gif.convert('RGBA')
                mode = frame.mode
                size = frame.size
                data = frame.tobytes()
                
                py_image = pygame.image.fromstring(data, size, mode)
                py_image = pygame.transform.scale(py_image, (WIDTH, HEIGHT))
                frames.append(py_image)
                
                gif.seek(gif.tell() + 1)
        except EOFError:
            pass
        
        print(f"Loaded {len(frames)} frames from GIF")
        return frames if frames else None
        
    except:
        try:
            img = pygame.image.load(path).convert()
            return [pygame.transform.scale(img, (WIDTH, HEIGHT))]
        except:
            return None

class ScoreManager:
    """Gestion des scores avec localStorage"""
    def __init__(self):
        self.scores = []
        self.load_scores()
    
    def load_scores(self):
        """Charge les scores depuis localStorage"""
        try:
            # Pour Pygbag, on utilise platform pour accéder au localStorage
            import platform
            if platform.system() == "Emscripten":
                # On est dans le navigateur
                import json
                from platform import window
                stored = window.localStorage.getItem("rythme_car_scores")
                if stored:
                    self.scores = json.loads(stored)
                else:
                    self.scores = []
            else:
                # Version desktop (fallback)
                self.scores = []
        except Exception as e:
            print(f"Error loading scores: {e}")
            self.scores = []
    
    def save_score(self, name, score):
        """Sauvegarde un nouveau score dans localStorage"""
        date = datetime.now().strftime("%Y-%m-%d %H:%M")
        
        new_score = {'name': name, 'score': score, 'date': date}
        self.scores.append(new_score)
        
        # Trier par score décroissant
        self.scores.sort(key=lambda x: int(x['score']), reverse=True)
        # Garder top 10
        self.scores = self.scores[:10]
        
        try:
            import platform
            if platform.system() == "Emscripten":
                import json
                from platform import window
                window.localStorage.setItem("rythme_car_scores", json.dumps(self.scores))
                print(f"Score saved: {score}")
        except Exception as e:
            print(f"Error saving score: {e}")
    
    def get_best_score(self):
        """Retourne le meilleur score"""
        if self.scores:
            return int(self.scores[0]['score'])
        return 0

class Menu:
    def __init__(self, score_manager):
        self.score_manager = score_manager
        self.frames = load_gif_frames("data/assets/Intro.gif")
        self.frame_index = 0
        self.frame_timer = 0
        self.frame_delay = 3
        
        self.name_text = ""
        self.cursor_visible = True
        self.cursor_timer = 0
        
        self.font_large = pygame.font.Font(None, 56)
        self.font_medium = pygame.font.Font(None, 44)
        self.font_small = pygame.font.Font(None, 40)
        self.font_tiny = pygame.font.Font(None, 28)
        self.font_button = pygame.font.Font(None, 48)
        
        self.play_button_rect = pygame.Rect(WIDTH // 2 - 120, HEIGHT - 180, 240, 70)
        self.play_button_hovered = False
        
        # Load background music
        try:
            pygame.mixer.music.load("data/audio/Night Rider.mp3")
            pygame.mixer.music.play(-1)
        except:
            print("Menu music not available")
    
    def handle_event(self, event):
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_BACKSPACE:
                self.name_text = self.name_text[:-1]
            elif event.key == pygame.K_RETURN and self.name_text.strip():
                return True
            elif len(self.name_text) < 20:
                if event.unicode.isprintable():
                    self.name_text += event.unicode
        
        elif event.type == pygame.MOUSEBUTTONDOWN:
            if self.play_button_rect.collidepoint(event.pos) and self.name_text.strip():
                return True
        
        elif event.type == pygame.MOUSEMOTION:
            self.play_button_hovered = self.play_button_rect.collidepoint(event.pos)
        
        return False
    
    def update(self):
        if self.frames and len(self.frames) > 1:
            self.frame_timer += 1
            if self.frame_timer >= self.frame_delay:
                self.frame_timer = 0
                self.frame_index = (self.frame_index + 1) % len(self.frames)
        
        self.cursor_timer += 1
        if self.cursor_timer >= 30:
            self.cursor_timer = 0
            self.cursor_visible = not self.cursor_visible
    
    def draw(self):
        if self.frames:
            screen.blit(self.frames[self.frame_index], (0, 0))
        else:
            screen.fill(BACKGROUND)
        
        # Overlay épuré
        overlay = pygame.Surface((WIDTH, HEIGHT))
        overlay.set_alpha(160)
        overlay.fill(BLACK)
        screen.blit(overlay, (0, 0))
        
        # Meilleur score en haut (simple)
        best_score = self.score_manager.get_best_score()
        if best_score > 0:
            best_text = self.font_small.render(f"Meilleur Score: {best_score}", True, WHITE)
            best_rect = best_text.get_rect(center=(WIDTH // 2, 60))
            screen.blit(best_text, best_rect)
        
        # Instruction simple
        instruction = self.font_small.render("entrez votre nom", True, WHITE)
        instruction_rect = instruction.get_rect(center=(WIDTH // 2, HEIGHT - 340))
        screen.blit(instruction, instruction_rect)
        
        # Input épuré
        display_text = self.name_text
        if self.cursor_visible and len(self.name_text) < 20:
            display_text += "|"
        
        name_surface = self.font_medium.render(display_text, True, ORANGE)
        name_rect = name_surface.get_rect(center=(WIDTH // 2, HEIGHT - 280))
        screen.blit(name_surface, name_rect)
        
        # Play button minimaliste
        button_color = ORANGE if self.name_text.strip() else (100, 100, 100)
        if self.play_button_hovered and self.name_text.strip():
            button_color = (255, 180, 50)
        
        pygame.draw.rect(screen, button_color, self.play_button_rect, border_radius=15)
        
        play_text = self.font_button.render("Play", True, BLACK)
        play_text_rect = play_text.get_rect(center=self.play_button_rect.center)
        screen.blit(play_text, play_text_rect)

class Car:
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.speed = 6  # Légèrement plus rapide
        
        try:
            self.image = pygame.image.load("data/assets/car.png").convert_alpha()
            self.image = pygame.transform.scale(self.image, (50, 90))
            self.width = 50
            self.height = 90
        except:
            self.image = None
            self.width = 40
            self.height = 70
            self.color = ORANGE
    
    def draw(self):
        if self.image:
            screen.blit(self.image, (self.x, self.y))
        else:
            pygame.draw.rect(screen, self.color, (self.x, self.y, self.width, self.height))
    
    def move(self, dx):
        self.x += dx
        if self.x < 60:
            self.x = 60
        if self.x > WIDTH - 60 - self.width:
            self.x = WIDTH - 60 - self.width

class Obstacle:
    obstacle_images = []
    
    @classmethod
    def load_images(cls):
        if not cls.obstacle_images:
            image_names = ["pickup_truck.png", "semi_trailer.png", "taxi.png", "van.png"]
            for name in image_names:
                try:
                    img = pygame.image.load(f"data/assets/{name}").convert_alpha()
                    img = pygame.transform.scale(img, (50, 90))
                    cls.obstacle_images.append(img)
                except:
                    print(f"Could not load {name}")
    
    def __init__(self, speed=7):
        Obstacle.load_images()
        
        self.width = 50
        self.height = 90
        
        # 4 voies distinctes
        lane_positions = [
            75,              # Voie 1
            WIDTH // 2 - 75, # Voie 2
            WIDTH // 2 + 25, # Voie 3
            WIDTH - 125      # Voie 4
        ]
        self.x = random.choice(lane_positions)
        self.y = -self.height
        self.speed = speed
        
        if Obstacle.obstacle_images:
            self.image = random.choice(Obstacle.obstacle_images)
        else:
            self.image = None
            self.color = WHITE
    
    def draw(self):
        if self.image:
            screen.blit(self.image, (self.x, self.y))
        else:
            pygame.draw.rect(screen, self.color, (self.x, self.y, self.width, self.height))
    
    def move(self):
        self.y += self.speed
    
    def is_off_screen(self):
        return self.y > HEIGHT

class Game:
    def __init__(self, player_name, score_manager):
        self.player_name = player_name
        self.score_manager = score_manager
        self.difficulty = "medium"
        
        self.obstacle_speed = 7
        self.spawn_rate = (30, 60)
        
        self.player = Car(WIDTH // 2 - 75, HEIGHT - 100)
        self.obstacles = []
        self.score = 0
        self.game_over = False
        self.crashed = False
        self.crash_timer = 0
        
        # Progression de difficulté
        self.difficulty_timer = 0
        
        # Road animation
        self.road_offset = 0
        self.road_speed = 8
        
        self.font = pygame.font.Font(None, 32)
        self.font_small = pygame.font.Font(None, 26)
        self.large_font = pygame.font.Font(None, 72)
        self.spawn_timer = 0
        
        # Load crash image
        try:
            self.crash_image = pygame.image.load("data/assets/crash.png").convert_alpha()
            self.crash_image = pygame.transform.scale(self.crash_image, (80, 80))
        except:
            self.crash_image = None
        
        # Load sounds
        try:
            self.crash_sound = pygame.mixer.Sound("data/audio/Explosion.mp3")
        except:
            self.crash_sound = None
        
        # Load game music
        try:
            pygame.mixer.music.load("data/audio/Game.mp3")
            pygame.mixer.music.play(-1)
        except:
            print("Game music not available")
    
    def spawn_obstacle(self):
        if self.spawn_timer <= 0:
            self.obstacles.append(Obstacle(self.obstacle_speed))
            self.spawn_timer = random.randint(*self.spawn_rate)
        self.spawn_timer -= 1
    
    def check_collision(self):
        for obs in self.obstacles:
            if (self.player.x < obs.x + obs.width - 10 and
                self.player.x + self.player.width > obs.x + 10 and
                self.player.y < obs.y + obs.height - 10 and
                self.player.y + self.player.height > obs.y + 10):
                return obs
        return None
    
    def update(self):
        if not self.game_over:
            # Progression de difficulté
            self.difficulty_timer += 1
            if self.difficulty_timer % 600 == 0:  # Toutes les 10 secondes
                self.obstacle_speed = min(12, self.obstacle_speed + 0.5)
                self.spawn_rate = (max(15, self.spawn_rate[0] - 2), max(30, self.spawn_rate[1] - 4))
                self.road_speed = min(12, self.road_speed + 0.5)
            
            # Animate road
            self.road_offset += self.road_speed
            if self.road_offset >= 40:
                self.road_offset = 0
            
            self.spawn_obstacle()
            
            for obs in self.obstacles:
                obs.move()
            
            self.obstacles = [obs for obs in self.obstacles if not obs.is_off_screen()]
            
            self.score += 1
            
            collision_obs = self.check_collision()
            if collision_obs:
                self.crashed = True
                self.crash_x = self.player.x
                self.crash_y = self.player.y
                self.game_over = True
                
                if self.crash_sound:
                    try:
                        self.crash_sound.play()
                    except:
                        pass
                
                try:
                    pygame.mixer.music.stop()
                except:
                    pass
                
                self.score_manager.save_score(self.player_name, self.score)
        
        if self.crashed:
            self.crash_timer += 1
    
    def draw(self):
        screen.fill(BACKGROUND)
        
        # Road lines (bordures)
        pygame.draw.line(screen, GRAY, (50, 0), (50, HEIGHT), 3)
        pygame.draw.line(screen, GRAY, (WIDTH - 50, 0), (WIDTH - 50, HEIGHT), 3)
        
        # 3 lignes blanches animées (4 voies)
        lane_positions = [
            WIDTH // 2 - 100,
            WIDTH // 2,
            WIDTH // 2 + 100
        ]
        
        for lane_x in lane_positions:
            for i in range(-40, HEIGHT, 40):
                y_pos = i + self.road_offset
                pygame.draw.line(screen, WHITE, (lane_x, y_pos), (lane_x, y_pos + 20), 2)
        
        # Draw obstacles
        for obs in self.obstacles:
            obs.draw()
        
        # Draw player or crash
        if self.crashed and self.crash_image and self.crash_timer < 60:
            screen.blit(self.crash_image, (self.crash_x - 15, self.crash_y - 10))
        elif not self.crashed:
            self.player.draw()
        
        # UI épurée - juste le score en haut
        ui_bg = pygame.Surface((WIDTH, 50))
        ui_bg.set_alpha(120)
        ui_bg.fill(BLACK)
        screen.blit(ui_bg, (0, 0))
        
        # Score centré en haut
        score_text = self.font.render(f"{self.score}", True, ORANGE)
        score_rect = score_text.get_rect(center=(WIDTH // 2, 25))
        screen.blit(score_text, score_rect)
        
        # Best score discret en haut à droite
        best = self.score_manager.get_best_score()
        best_text = self.font_small.render(f"Best: {best}", True, (150, 150, 150))
        best_rect = best_text.get_rect(topright=(WIDTH - 10, 15))
        screen.blit(best_text, best_rect)
        
        # Game over épuré
        if self.game_over and self.crash_timer > 60:
            # Overlay sombre
            overlay = pygame.Surface((WIDTH, HEIGHT))
            overlay.set_alpha(220)
            overlay.fill(BLACK)
            screen.blit(overlay, (0, 0))
            
            # Score final grand
            final_score = self.large_font.render(str(self.score), True, ORANGE)
            score_rect = final_score.get_rect(center=(WIDTH // 2, HEIGHT // 2 - 40))
            screen.blit(final_score, score_rect)
            
            # Nouveau record ?
            if self.score >= best:
                new_record = self.font.render("NOUVEAU RECORD !", True, WHITE)
                record_rect = new_record.get_rect(center=(WIDTH // 2, HEIGHT // 2 + 30))
                screen.blit(new_record, record_rect)
            else:
                best_text = self.font_small.render(f"Record: {best}", True, GRAY)
                best_rect = best_text.get_rect(center=(WIDTH // 2, HEIGHT // 2 + 30))
                screen.blit(best_text, best_rect)
            
            # Instructions épurées
            space_text = self.font.render("ESPACE - Rejouer", True, WHITE)
            space_rect = space_text.get_rect(center=(WIDTH // 2, HEIGHT // 2 + 90))
            screen.blit(space_text, space_rect)
            
            menu_text = self.font_small.render("R - Menu", True, GRAY)
            menu_rect = menu_text.get_rect(center=(WIDTH // 2, HEIGHT // 2 + 130))
            screen.blit(menu_text, menu_rect)

async def main():
    state = "menu"
    score_manager = ScoreManager()
    menu = Menu(score_manager)
    game = None
    running = True
    
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            
            if state == "menu":
                start_game = menu.handle_event(event)
                if start_game:
                    game = Game(menu.name_text.strip(), score_manager)
                    state = "game"
            
            elif state == "game":
                if event.type == pygame.KEYDOWN:
                    if game.game_over and game.crash_timer > 60:
                        if event.key == pygame.K_SPACE:
                            # Rejouer avec le même nom
                            game = Game(game.player_name, score_manager)
                        elif event.key == pygame.K_r:
                            # Retour au menu
                            menu = Menu(score_manager)
                            state = "menu"
        
        if state == "menu":
            menu.update()
            menu.draw()
        elif state == "game":
            if not game.game_over:
                keys = pygame.key.get_pressed()
                if keys[pygame.K_LEFT]:
                    game.player.move(-game.player.speed)
                if keys[pygame.K_RIGHT]:
                    game.player.move(game.player.speed)
            
            game.update()
            game.draw()
        
        pygame.display.flip()
        clock.tick(FPS)
        
        await asyncio.sleep(0)
    
    pygame.quit()

asyncio.run(main())
