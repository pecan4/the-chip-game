namespace SpriteKind {
    export const chip = SpriteKind.create()
    export const no_colisions = SpriteKind.create()
    export const enemy_chip = SpriteKind.create()
}
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
    if (sprites.readDataNumber(sprite, "hp") == 0 || sprites.readDataNumber(otherSprite, "hp") == 0) {
        if (sprites.readDataNumber(sprite, "hp") == 0) {
            sprites.destroy(sprite)
        }
        if (sprites.readDataNumber(otherSprite, "hp") == 0) {
            sprites.destroy(otherSprite)
        }
    } else {
        sprites.changeDataNumberBy(otherSprite, "hp", -1)
        otherSprite.startEffect(effects.rings, 100)
        if (sprites.readDataNumber(otherSprite, "hp") == 0) {
            sprites.destroy(otherSprite, effects.fountain, 100)
            path = scene.aStar(sprite.tilemapLocation(), tiles.getTileLocation(0, 0), sprites.castle.tilePath5)
        }
        sprites.changeDataNumberBy(sprite, "hp", 1)
        sprite.startEffect(effects.rings, 100)
        if (sprites.readDataNumber(sprite, "hp") == 0) {
            sprites.destroy(sprite, effects.fountain, 100)
            path = scene.aStar(otherSprite.tilemapLocation(), tiles.getTileLocation(0, 0), sprites.castle.tilePath5)
        }
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    toolbar.change_number(ToolbarNumberAttribute.SelectedIndex, -1)
    if (toolbar.get_number(ToolbarNumberAttribute.SelectedIndex) < 0) {
        toolbar.change_number(ToolbarNumberAttribute.SelectedIndex, 1)
    } else {
    	
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    toolbar.change_number(ToolbarNumberAttribute.SelectedIndex, 1)
    if (toolbar.get_number(ToolbarNumberAttribute.SelectedIndex) > 6) {
        toolbar.change_number(ToolbarNumberAttribute.SelectedIndex, -1)
    } else {
    	
    }
})
let enemy_chip_sprite: Sprite = null
let path: tiles.Location[] = []
let chip_sprite: Sprite = null
let toolbar: Inventory.Toolbar = null
let $$$ = 0
tiles.setCurrentTilemap(tilemap`level5`)
let camera_sprite = sprites.create(assets.image`camera sprite`, SpriteKind.no_colisions)
let basic_chip = Inventory.create_item("basic", assets.image`standard chip`)
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
    `)
toolbar = Inventory.create_toolbar([
basic_chip,
wall_chip
], 7)
toolbar.z = 100
camera_sprite.z = 100
toolbar.setFlag(SpriteFlag.RelativeToCamera, true)
toolbar.setPosition(80, 105)
scene.cameraFollowSprite(camera_sprite)
controller.moveSprite(camera_sprite)
camera_sprite.setStayInScreen(true)
forever(function () {
    enemy_chip_sprite = sprites.create(assets.image`moldy_basic`, SpriteKind.enemy_chip)
    tiles.placeOnTile(enemy_chip_sprite, tiles.getTileLocation(2, 0))
    path = scene.aStar(enemy_chip_sprite.tilemapLocation(), tiles.getTileLocation(12, 14), sprites.castle.tilePath5)
    scene.followPath(enemy_chip_sprite, path, 25)
    sprites.setDataNumber(enemy_chip_sprite, "hp", 2)
})
