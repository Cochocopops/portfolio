import asyncio
import pygame
import random
from datetime import datetime

# Initialize Pygame and music
pygame.init()
pygame.mixer.init()

# Screen dimensions
width, height = (444, 790)
screen = pygame.display.set_mode((width, height))
pygame.display.set_caption('Rythme Car Game')

# Load and play background music on loop
try:
    pygame.mixer.music.load("data/audio/Game.mp3")
    pygame.mixer.music.play(-1)
except:
    print("Audio not loaded - continuing without sound")

# Load explosion sound
try:
    explosion_sound = pygame.mixer.Sound("data/audio/Explosion.mp3")
except:
    explosion_sound = None

# Colors for UI
COLOR_BACKGROUND = (30, 30, 30)
COLOR_ROAD = (50, 50, 70)
COLOR_MARKER = (70, 70, 90)
COLOR_TEXT = (200, 200, 200)
COLOR_ORANGE = (255, 152, 0)
COLOR_CRASH = (255, 0, 0)
COLOR_BUTTON_TEXT = (255, 255, 255)

# Road width and lane positions
road_width = 300
left_lane = 122
center_lane = 222
right_lane = 322
lanes = [left_lane, center_lane, right_lane]

# Initial player position
player_x = 222
player_y = 600

# Game variables
clock = pygame.time.Clock()
fps = 60  # Réduit pour le web
gameover = False
speed = 2
score = 0
high_score = 0
paused = False
lane_marker_move_y = 0

# Start/Stop text position and Menu button rectangle
start_stop_text_pos = (width - 100, 20)
restart_button_rect = pygame.Rect(width // 2 - 75, height // 2 + 100, 150, 50)

# Classes for vehicles
class Vehicle(pygame.sprite.Sprite):
    def __init__(self, image, x, y):
        pygame.sprite.Sprite.__init__(self)
        image_scale = 45 / image.get_rect().width
        new_width = int(image.get_rect().width * image_scale)
        new_height = int(image.get_rect().height * image_scale)
        self.image = pygame.transform.scale(image, (new_width, new_height))
        self.rect = self.image.get_rect()
        self.rect.center = [x, y]

class PlayerVehicle(Vehicle):
    def __init__(self, x, y):
        image = pygame.image.load('data/assets/car.png')
        super().__init__(image, x, y)

# Sprite groups for player and other vehicles
player_group = pygame.sprite.Group()
vehicle_group = pygame.sprite.Group()

# Create the player vehicle
player = PlayerVehicle(player_x, player_y)
player_group.add(player)

# Load images of other vehicles
image_filenames = ['pickup_truck.png', 'semi_trailer.png', 'taxi.png', 'van.png']
vehicle_images = [pygame.image.load('data/assets/' + img) for img in image_filenames]

# Load crash image
crash = pygame.image.load('data/assets/crash.png')
crash_rect = crash.get_rect()

def reset_game():
    global gameover, speed, score, paused, vehicle_group, player
    gameover = False
    speed = 2
    score = 0
    paused = False
    vehicle_group.empty()
    player.rect.center = [player_x, player_y]
    try:
        pygame.mixer.music.play(-1)
    except:
        pass

# Main game loop - ASYNCIO VERSION for Pygbag
async def main():
    global gameover, speed, score, high_score, paused, lane_marker_move_y
    
    running = True
    while running:
        clock.tick(fps)

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_SPACE and not gameover:
                    paused = not paused
                    try:
                        pygame.mixer.music.pause() if paused else pygame.mixer.music.unpause()
                    except:
                        pass
                elif event.key == pygame.K_RETURN and gameover:
                    reset_game()
                elif event.key == pygame.K_LEFT and not paused and not gameover and player.rect.center[0] > left_lane:
                    player.rect.x -= 100
                elif event.key == pygame.K_RIGHT and not paused and not gameover and player.rect.center[0] < right_lane:
                    player.rect.x += 100
            elif event.type == pygame.MOUSEBUTTONDOWN:
                if gameover and restart_button_rect.collidepoint(event.pos):
                    reset_game()
                if start_stop_text_pos[0] <= event.pos[0] <= start_stop_text_pos[0] + 80 and start_stop_text_pos[1] <= event.pos[1] <= start_stop_text_pos[1] + 30 and not gameover:
                    paused = not paused
                    try:
                        pygame.mixer.music.pause() if paused else pygame.mixer.music.unpause()
                    except:
                        pass

        if not paused and not gameover:
            # Draw background and road
            screen.fill(COLOR_BACKGROUND)
            pygame.draw.rect(screen, COLOR_ROAD, (72, 0, road_width, height))

            # Draw lane markers
            lane_marker_move_y = (lane_marker_move_y + speed * 2) % (50 * 2)
            for y in range(-100, height, 100):
                pygame.draw.rect(screen, COLOR_MARKER, (left_lane + 45, y + lane_marker_move_y, 10, 50))
                pygame.draw.rect(screen, COLOR_MARKER, (center_lane + 45, y + lane_marker_move_y, 10, 50))

            # Update and draw the player
            player_group.draw(screen)

            # Add and move other vehicles
            if len(vehicle_group) < 2:
                if all(vehicle.rect.top >= vehicle.rect.height * 1.5 for vehicle in vehicle_group):
                    lane = random.choice(lanes)
                    image = random.choice(vehicle_images)
                    vehicle = Vehicle(image, lane, -100)
                    vehicle_group.add(vehicle)

            for vehicle in vehicle_group:
                vehicle.rect.y += speed
                if vehicle.rect.top >= height:
                    vehicle.kill()
                    score += 1
                    if score % 5 == 0:
                        speed += 1
            vehicle_group.draw(screen)

            # Check for collisions
            if pygame.sprite.spritecollide(player, vehicle_group, True):
                gameover = True
                try:
                    pygame.mixer.music.stop()
                    if explosion_sound:
                        explosion_sound.play()
                except:
                    pass
                crash_rect.center = player.rect.center
                
                # Update high score
                if score > high_score:
                    high_score = score

        # Display the score in-game
        font = pygame.font.Font(pygame.font.get_default_font(), 24)
        score_text = font.render(f'Score: {score}', True, COLOR_TEXT)
        screen.blit(score_text, (20, 20))
        
        # Display high score
        high_score_text = font.render(f'Best: {high_score}', True, COLOR_ORANGE)
        screen.blit(high_score_text, (20, 50))

        # Display "Start" or "Stop" text in top-right
        start_stop_text = "Start" if paused else "Stop"
        start_stop_display = font.render(start_stop_text, True, COLOR_BUTTON_TEXT)
        if not paused:
            screen.blit(start_stop_display, start_stop_text_pos)

        # Handle Game Over
        if gameover:
            screen.blit(crash, crash_rect)
            gameover_font = pygame.font.Font(None, 72)
            gameover_text = gameover_font.render("GAME OVER", True, COLOR_CRASH)
            screen.blit(gameover_text, gameover_text.get_rect(center=(width // 2, height // 2 - 100)))

            score_font = pygame.font.Font(None, 48)
            final_score_text = score_font.render(f"Score: {score}", True, COLOR_BUTTON_TEXT)
            screen.blit(final_score_text, final_score_text.get_rect(center=(width // 2, height // 2)))

            pygame.draw.rect(screen, COLOR_ORANGE, restart_button_rect, border_radius=10)
            button_text = font.render("Restart", True, COLOR_BUTTON_TEXT)
            screen.blit(button_text, button_text.get_rect(center=restart_button_rect.center))

        # Display "Pause" text in center of screen if paused
        if paused and not gameover:
            pause_font = pygame.font.Font(pygame.font.get_default_font(), 48)
            pause_text = pause_font.render("Pause", True, COLOR_ORANGE)
            screen.blit(pause_text, pause_text.get_rect(center=(width // 2, height // 2)))

        pygame.display.update()
        
        # CRUCIAL pour Pygbag!
        await asyncio.sleep(0)

    # Quit Pygame
    try:
        pygame.mixer.music.stop()
    except:
        pass
    pygame.quit()

# Lance le jeu
asyncio.run(main())

