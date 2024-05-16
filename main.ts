namespace SpriteKind {
    export const chip = SpriteKind.create()
    export const no_colisions = SpriteKind.create()
    export const enemy_chip = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (battling) {
        if (!(controller.right.isPressed() || controller.left.isPressed())) {
            _chip_following += 1
            scene.cameraFollowSprite(sprites.allOfKind(SpriteKind.chip)[_chip_following])
            if (_chip_following > sprites.allOfKind(SpriteKind.chip).length) {
                _chip_following = 0
                scene.cameraFollowSprite(sprites.allOfKind(SpriteKind.chip)[_chip_following])
            }
        }
        for (let index = 0; index < 100; index++) {
            if (free_camera) {
                if (controller.B.isPressed()) {
                    free_camera = true
                    controller.moveSprite(camera_sprite, 100, 100)
                    scene.cameraFollowSprite(camera_sprite)
                }
            }
            if (free_camera) {
                if (controller.B.isPressed()) {
                    free_camera = false
                    controller.moveSprite(camera_sprite, 0, 0)
                }
            }
            pause(1)
        }
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)].get_text(ItemTextAttribute.Name) == "basic") {
        chip_sprite = sprites.create(toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)].get_image(), SpriteKind.chip)
        sprites.setDataString(chip_sprite, "type", "basic")
        sprites.setDataNumber(chip_sprite, "hp", 1)
        tiles.placeOnTile(chip_sprite, tiles.getTileLocation(12, 14))
        path = scene.aStar(chip_sprite.tilemapLocation(), tiles.getTileLocation(2, 0), sprites.castle.tilePath5)
        scene.followPath(chip_sprite, path, 25)
    } else if (toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)].get_text(ItemTextAttribute.Name) == "wall") {
        chip_sprite = sprites.create(toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)].get_image(), SpriteKind.chip)
        sprites.setDataString(chip_sprite, "type", "wall")
        sprites.setDataNumber(chip_sprite, "hp", 3)
        tiles.placeOnTile(chip_sprite, tiles.getTileLocation(12, 14))
        path = scene.aStar(chip_sprite.tilemapLocation(), tiles.getTileLocation(2, 0), sprites.castle.tilePath5)
        scene.followPath(chip_sprite, path, 15)
    } else if (toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)].get_text(ItemTextAttribute.Name) == "null") {
    	
    } else if (toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)].get_text(ItemTextAttribute.Name) == "null") {
    	
    } else if (toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)].get_text(ItemTextAttribute.Name) == "null") {
    	
    } else if (toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)].get_text(ItemTextAttribute.Name) == "null") {
    	
    } else if (toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)].get_text(ItemTextAttribute.Name) == "null") {
    	
    } else {
    	
    }
})
sprites.onOverlap(SpriteKind.chip, SpriteKind.enemy_chip, function (sprite, otherSprite) {
    path = scene.aStar(sprite.tilemapLocation(), sprite.tilemapLocation())
    scene.followPath(sprite, path, 0)
    path = scene.aStar(otherSprite.tilemapLocation(), otherSprite.tilemapLocation())
    scene.followPath(otherSprite, path, 0)
    if (sprites.readDataNumber(sprite, "hp") <= 0 || sprites.readDataNumber(otherSprite, "hp") <= 0) {
        if (sprites.readDataNumber(sprite, "hp") <= 0) {
            sprites.destroy(sprite)
        }
        if (sprites.readDataNumber(otherSprite, "hp") <= 0) {
            sprites.destroy(otherSprite)
        }
    } else {
        sprites.changeDataNumberBy(otherSprite, "hp", -1)
        extraEffects.createSpreadEffectOnAnchor(otherSprite, extraEffects.createSingleColorSpreadEffectData(5, ExtraEffectPresetShape.Spark), 100, 30, 5)
        pause(100)
        if (sprites.readDataNumber(otherSprite, "hp") <= 0) {
            extraEffects.createSpreadEffectOnAnchor(otherSprite, chip_death_explosion, 100, 48, 5)
            sprites.destroy(otherSprite)
            path = scene.aStar(sprite.tilemapLocation(), tiles.getTileLocation(2, 0), sprites.castle.tilePath5)
            if (sprites.readDataString(sprite, "type") == "basic") {
                scene.followPath(sprite, path, 25)
            } else if (sprites.readDataString(sprite, "type") == "wall") {
                scene.followPath(sprite, path, 15)
            } else {
            	
            }
        }
        sprites.changeDataNumberBy(sprite, "hp", -1)
        extraEffects.createSpreadEffectOnAnchor(sprite, extraEffects.createSingleColorSpreadEffectData(5, ExtraEffectPresetShape.Spark), 100, 30, 10)
        pause(100)
        if (sprites.readDataNumber(sprite, "hp") <= 0) {
            extraEffects.createSpreadEffectOnAnchor(sprite, chip_death_explosion, 100, 48, 10)
            sprites.destroy(sprite)
            path = scene.aStar(otherSprite.tilemapLocation(), tiles.getTileLocation(12, 14), sprites.castle.tilePath5)
            if (sprites.readDataString(otherSprite, "type") == "basic") {
                scene.followPath(otherSprite, path, 25)
            } else if (sprites.readDataString(otherSprite, "type") == "wall") {
                scene.followPath(otherSprite, path, 15)
            } else {
            	
            }
        }
    }
    if (sprites.readDataNumber(otherSprite, "hp") <= 0) {
        extraEffects.createSpreadEffectOnAnchor(otherSprite, chip_death_explosion, 100, 48, 10)
        sprites.destroy(otherSprite)
        path = scene.aStar(sprite.tilemapLocation(), tiles.getTileLocation(2, 0), sprites.castle.tilePath5)
        if (sprites.readDataString(sprite, "type") == "basic") {
            scene.followPath(sprite, path, 25)
        } else if (sprites.readDataString(sprite, "type") == "wall") {
            scene.followPath(sprite, path, 15)
        } else {
        	
        }
    }
    if (sprites.readDataNumber(sprite, "hp") <= 0) {
        extraEffects.createSpreadEffectOnAnchor(sprite, chip_death_explosion, 100, 48, 10)
        sprites.destroy(sprite)
        path = scene.aStar(otherSprite.tilemapLocation(), tiles.getTileLocation(12, 14), sprites.castle.tilePath5)
        scene.followPath(otherSprite, path, 25)
    }
})
/**
 * chip types:
 * 
 * basic
 * 
 * wall
 */
/**
 * things to do/add:
 * 
 * add the particle effects extension
 * 
 * add a text extension
 * 
 * get better camera system
 * 
 * add more chips
 */
let enemy_chip_sprite: Sprite = null
let path: tiles.Location[] = []
let chip_sprite: Sprite = null
let _chip_following = 0
let free_camera = false
let battling = false
let toolbar: Inventory.Toolbar = null
let camera_sprite: Sprite = null
let chip_death_explosion: SpreadEffectData = null
stats.turnStats(true)
chip_death_explosion = extraEffects.createCustomSpreadEffectData(
[5, 1],
true,
[
5,
4,
3,
6,
10,
9,
8
],
extraEffects.createPercentageRange(15, 25),
extraEffects.createPercentageRange(30, 45),
extraEffects.createTimeRange(200, 400)
)
let $$$ = 0
tiles.setCurrentTilemap(tilemap`level5`)
camera_sprite = sprites.create(assets.image`camera sprite`, SpriteKind.no_colisions)
let basic_chip = Inventory.create_item("basic", assets.image`standard chip`, "the most basic unit. Came from a dollar store bag of tortilla chips")
let wall_chip = Inventory.create_item("wall", img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . 5 5 5 . . . . . 
    . . . . 5 5 5 5 5 5 f 5 . . . . 
    . 5 5 5 5 5 f f f f 5 5 5 . . . 
    . 5 5 5 f f f 5 5 5 5 5 5 . . . 
    . 5 f f f 5 5 5 5 f 5 5 5 . . . 
    . 5 5 5 5 5 f 5 5 5 5 5 5 f f . 
    . 5 5 5 5 5 5 5 5 5 5 5 5 . f f 
    . 5 5 5 5 5 5 5 5 5 5 5 5 . . f 
    . . 5 5 5 5 5 5 f f f f 5 5 . f 
    . f 5 5 f f f f f 1 1 f 5 5 . f 
    f f 5 5 5 f 1 1 1 1 f f 5 5 . . 
    f . 5 5 5 5 f f f f f 5 5 5 . . 
    f . 5 5 5 5 5 5 5 5 5 f . . . . 
    . . . 5 5 5 f . . . . f f . . . 
    . . . . . . f . . . . . f . . . 
    `, "A larger and stronger than average chip. comes from the \"mutation\" bin in the chip factories")
toolbar = Inventory.create_toolbar([
basic_chip,
wall_chip
], 7)
toolbar.z = 100
camera_sprite.z = 100
toolbar.setFlag(SpriteFlag.RelativeToCamera, true)
toolbar.setPosition(80, 105)
scene.cameraFollowSprite(camera_sprite)
camera_sprite.setStayInScreen(true)
battling = true
free_camera = false
forever(function () {
    enemy_chip_sprite = sprites.create(assets.image`moldy_basic`, SpriteKind.enemy_chip)
    tiles.placeOnTile(enemy_chip_sprite, tiles.getTileLocation(2, 0))
    path = scene.aStar(enemy_chip_sprite.tilemapLocation(), tiles.getTileLocation(12, 14), sprites.castle.tilePath5)
    scene.followPath(enemy_chip_sprite, path, 25)
    sprites.setDataString(enemy_chip_sprite, "type", "basic")
    sprites.setDataNumber(enemy_chip_sprite, "hp", 2)
    pause(5000)
})
forever(function () {
    if (battling) {
        if (controller.B.isPressed()) {
            if (controller.right.isPressed()) {
                toolbar.change_number(ToolbarNumberAttribute.SelectedIndex, 1)
                if (toolbar.get_number(ToolbarNumberAttribute.SelectedIndex) > 6) {
                    toolbar.change_number(ToolbarNumberAttribute.SelectedIndex, -1)
                }
                pause(100)
            }
            if (controller.left.isPressed()) {
                toolbar.change_number(ToolbarNumberAttribute.SelectedIndex, -1)
                if (toolbar.get_number(ToolbarNumberAttribute.SelectedIndex) < 0) {
                    toolbar.change_number(ToolbarNumberAttribute.SelectedIndex, 1)
                }
                pause(100)
            }
        }
    }
})
