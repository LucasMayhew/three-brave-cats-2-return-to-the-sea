namespace SpriteKind {
    export const Bakeground = SpriteKind.create()
    export const levelpice = SpriteKind.create()
    export const NPC = SpriteKind.create()
    export const hp = SpriteKind.create()
    export const NPCTalk = SpriteKind.create()
    export const EP_NOTTHEMUCISTIME = SpriteKind.create()
    export const Kwind = SpriteKind.create()
    export const Nothing = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if ((sprites.readDataNumber(otherSprite, "type") == 2 || (sprites.readDataNumber(otherSprite, "type") == 4 || (sprites.readDataNumber(otherSprite, "type") == 21 || (sprites.readDataNumber(otherSprite, "type") == 5 || sprites.readDataNumber(otherSprite, "type") == 3)))) && sprite.y < otherSprite.top) {
        partical = sprites.create(img`
            . . . . . . . . 
            . . . . . 1 . . 
            . . . . 1 1 . . 
            . . . . . 1 . . 
            . 1 1 1 . 1 . . 
            . . . . . 1 . . 
            . . . . 1 1 1 . 
            . . . . . . . . 
            `, SpriteKind.Bakeground)
        partical.setPosition(otherSprite.x, otherSprite.y)
        partical.setVelocity(randint(-50, 50), randint(-50, 50))
        partical.setFlag(SpriteFlag.GhostThroughWalls, true)
        sprites.changeDataNumberBy(otherSprite, "hp", -1)
        partical.lifespan = 500
        if (sprites.readDataNumber(otherSprite, "hp") <= 0) {
            otherSprite.destroy()
            sprites.readDataSprite(otherSprite, "hpim").destroy()
            if (sprites.readDataNumber(otherSprite, "type") == 4) {
                for (let value of tiles.getTilesByType(assets.tile`myTile70`)) {
                    tiles.setWallAt(value, false)
                }
                tileUtil.coverAllTiles(assets.tile`myTile70`, assets.tile`transparency16`)
                tileUtil.replaceAllTiles(assets.tile`myTile70`, assets.tile`transparency16`)
            }
            if (sprites.readDataNumber(otherSprite, "type") == 20) {
                endlevel()
            } else if (sprites.readDataNumber(otherSprite, "type") == 21) {
                endlevel()
            }
        }
        sprite.vy = -100
    } else {
        partical = sprites.create(img`
            . . . . . . . . 
            . . . . . 1 . . 
            . . . . 1 1 . . 
            . . . . . 1 . . 
            . 1 1 1 . 1 . . 
            . . . . . 1 . . 
            . . . . 1 1 1 . 
            . . . . . . . . 
            `, SpriteKind.Bakeground)
        partical.setPosition(sprite.x, sprite.y)
        partical.setVelocity(randint(-50, 50), randint(-50, 50))
        partical.lifespan = 500
        partical.setFlag(SpriteFlag.GhostThroughWalls, true)
        sprites.changeDataNumberBy(sprite, "hp", -1)
        music.powerDown.play()
        if (zoom2) {
            zoom += 1
            timer.after(5000, function () {
                zoom += -1
            })
        }
        if (sprites.readDataNumber(sprite, "hp") <= 0) {
            game.over(false)
        }
        pause(1000)
    }
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite, otherSprite) {
    otherSprite.destroy()
    partical = sprites.create(img`
        . . . . . . . . 
        . . . . . 1 . . 
        . . . . 1 1 . . 
        . . . . . 1 . . 
        . 1 1 1 . 1 . . 
        . . . . . 1 . . 
        . . . . 1 1 1 . 
        . . . . . . . . 
        `, SpriteKind.Bakeground)
    partical.setPosition(sprite.x, sprite.y)
    partical.setVelocity(randint(-50, 50), randint(-50, 50))
    partical.setFlag(SpriteFlag.GhostThroughWalls, true)
    sprites.changeDataNumberBy(sprite, "hp", -1)
    partical.lifespan = 500
    if (sprites.readDataNumber(sprite, "hp") <= 0) {
        sprite.destroy()
        sprites.readDataSprite(sprite, "hpim").destroy()
        if (sprites.readDataNumber(sprite, "type") == 4) {
            for (let value of tiles.getTilesByType(assets.tile`myTile70`)) {
                tiles.setWallAt(value, false)
            }
            tileUtil.coverAllTiles(assets.tile`myTile70`, assets.tile`transparency16`)
            tileUtil.replaceAllTiles(assets.tile`myTile70`, assets.tile`transparency16`)
        }
        if (sprites.readDataNumber(sprite, "type") == 20) {
            endlevel()
        }
        if (sprites.readDataNumber(sprite, "type") == 21) {
            endlevel()
        }
        if (sprites.readDataNumber(sprite, "type") == 22) {
            endlevel()
        }
        if (sprites.readDataNumber(sprite, "type") == 30) {
            endlevel()
        }
    }
    if (sprites.readDataNumber(sprite, "type") == 4) {
        sprite.setFlag(SpriteFlag.GhostThroughSprites, true)
        pause(500)
        sprite.setFlag(SpriteFlag.GhostThroughSprites, false)
    }
    if (sprites.readDataNumber(sprite, "type") == 20) {
        animation.stopAnimation(animation.AnimationTypes.All, sprite)
        sprite.image.replace(12, 2)
        sprite.image.replace(1, 4)
        sprite.setFlag(SpriteFlag.GhostThroughSprites, true)
        pause(2000)
        sprite.setFlag(SpriteFlag.GhostThroughSprites, false)
        sprite.setImage(img`
            ................
            ........4....44.
            .......44..1444.
            ......44111c141.
            .....111cccc11c.
            ....4cc111111c..
            ....476cc11114..
            ....46744cc11...
            ....41111111c...
            ....11cccccc....
            ....cc111111....
            .....11cccc.....
            ......1111......
            ..ccc1111111cc..
            ..111cccc11111..
            ..1111111ccccc..
            ..cccccccccccc..
            ..111111111111..
            ..ccc111111ccc..
            ..111cccccc111..
            ..111111111ccc..
            ..cccccccccccc..
            ..111111ccccc1..
            ..cccccc111111..
            ..11cccccccccc..
            ..11111ccc1111..
            ....111111cc....
            .....11ccc1.....
            .....cc111c.....
            .....11cc11.....
            .....cc11cc.....
            ................
            `)
    }
})
controller.player2.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function () {
    if (game_on && p2) {
        shoot(Player_2)
    }
})
spriteutils.createRenderable(0, function (screen2) {
    if (levelslacker) {
        for (let index = 0; index <= 18; index++) {
            screen2.drawLine(allllevelpice[index].x - scene.cameraProperty(CameraProperty.Left), allllevelpice[index].y - scene.cameraProperty(CameraProperty.Top), allllevelpice[index + 1].x - scene.cameraProperty(CameraProperty.Left), allllevelpice[index + 1].y - scene.cameraProperty(CameraProperty.Top), 13)
        }
    }
})
function NPCsF (mySprite: Sprite) {
    if (levelnublucasM == 1) {
        NPCs = sprites.create(img`
            .......64c.............e.
            ......644c6..........eeb.
            .....66cc666........e..b.
            .......4444........e...b.
            .......4ff44.....ee....b.
            .....dd44411....e......b.
            ....ddd441111...e......b.
            ...ddd4441..1.ee.......b.
            ...4444dd.4..e.........b.
            ...4444d444ee..........b.
            ...d424444e............b.
            ...d442442444..........2d
            ...dd4222d4444.........d2
            ...4444ddd4444.........f.
            ..44444dd42.444.........f
            ..422222222..44........f.
            `, SpriteKind.NPCTalk)
        tiles.placeOnRandomTile(NPCs, assets.tile`myTile46`)
        sprites.setDataBoolean(NPCs, "Said something this level", true)
        sprites.setDataString(NPCs, "sayshi", "Hello youngens")
        sprites.setDataString(NPCs, "says1", "I am a very old cat who loved to CATch some fish")
        sprites.setDataString(NPCs, "says2", "This was a very deap lake that was so deap you couldn't see the bottom")
        sprites.setDataString(NPCs, "says3", "But it all dry now but I am waiting for the water to come back")
        sprites.setDataNumber(NPCs, "speed", 5000)
        tileUtil.replaceAllTiles(assets.tile`myTile46`, assets.tile`transparency16`)
        tileUtil.replaceAllTiles(assets.tile`myTile57`, img`
            e c c c c e e e e e e e e e e e 
            e e e e e e e e e e e e c c e e 
            c c c c c c c c c c c c c c c c 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
        animation.runImageAnimation(
        NPCs,
        [img`
            .........................
            .......64c.............e.
            ......644c6..........eeb.
            .....66cc666........e..b.
            .......4444........e...b.
            .......4ff44.....ee....b.
            .....dd44411....e......b.
            ....ddd441111...e......b.
            ...ddd4441..1.ee.......b.
            ...4444dd.4..e.........b.
            ...4444d444ee..........b.
            ...d424444e............b.
            ...d442442444..........2d
            ...dd4222d4444.........d2
            ...4444ddd4444.........f.
            ..44444dd42.444.........f
            ..422222222..44........f.
            `,img`
            .......64c...............
            ......644c6............e.
            .....66cc666.........eeb.
            .......4444.........e..b.
            .......4ff44.......e...b.
            .....dd44411.....ee....b.
            ....ddd441111...e......b.
            ....dd4441..1...e......b.
            ...ddd4dd.....ee.......b.
            ...4444dd.4..e.........b.
            ...4444d444ee..........b.
            ...d424444e............bd
            ...d442442444..........22
            ...dd4222d4444.........d.
            ...4444ddd4444.........ff
            ..44444dd42.444..........
            ..422222222..44........f.
            `],
        500,
        true
        )
    }
    if (levelnublucasM == 3) {
        NPCs = sprites.create(img`
            . . . . . . . . . . e e . . . . 
            . . . . . . . e e e e e . . . . 
            . . . . . e e e e e e c . . . . 
            . . . e e c c c c c c . . . . . 
            . . . c c 3 1 4 3 1 4 . . . . . 
            . . . . . 3 1 4 3 1 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . e e e e e e . . . . . 
            . . . . . 4 e e e e 4 . . . . . 
            . . . . . 4 e e e e 4 . . . . . 
            . . . . . . e e e 6 . . . . . . 
            . . . . . . 6 6 6 6 4 4 4 4 . . 
            . . . . . . 6 . . 6 . . . . . . 
            . . . . . . 6 . . 6 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `, SpriteKind.NPCTalk)
        tiles.placeOnRandomTile(NPCs, assets.tile`myTile46`)
        sprites.setDataBoolean(NPCs, "Said something this level", true)
        sprites.setDataString(NPCs, "sayshi", "Hi")
        sprites.setDataString(NPCs, "says1", "I am a researcher researching these ruins")
        sprites.setDataString(NPCs, "says2", "They are very old")
        sprites.setDataString(NPCs, "says3", "Any ways have fun")
        tileUtil.replaceAllTiles(assets.tile`myTile46`, assets.tile`transparency16`)
        tileUtil.replaceAllTiles(assets.tile`myTile60`, img`
            4 5 5 5 5 5 5 5 5 5 5 5 5 5 5 4 
            4 5 5 5 5 5 5 5 5 5 5 5 4 4 5 4 
            4 5 5 5 5 5 5 5 5 5 5 5 4 4 5 4 
            4 5 4 4 5 5 5 5 5 5 5 5 4 4 5 4 
            4 5 4 4 5 5 5 5 5 5 5 5 4 4 5 4 
            4 5 4 4 5 5 5 5 5 5 5 5 4 4 5 4 
            4 5 4 4 5 5 5 5 5 5 5 5 4 4 5 4 
            5 5 4 4 5 5 5 5 5 5 5 5 4 4 5 4 
            4 5 4 4 5 5 5 5 5 5 5 5 4 4 5 4 
            4 5 4 4 5 5 5 5 5 5 5 5 4 4 5 4 
            4 5 4 4 5 5 5 5 5 5 5 5 4 4 5 4 
            4 5 4 4 5 5 5 5 5 5 5 5 4 4 5 4 
            4 5 4 4 5 5 5 5 5 5 5 5 5 5 5 5 
            4 5 4 4 5 5 5 5 5 5 5 5 5 5 5 5 
            4 5 4 4 5 5 5 5 5 5 5 5 5 5 5 4 
            4 5 5 5 5 5 5 5 5 5 5 5 5 5 5 4 
            `)
        tileUtil.replaceAllTiles(assets.tile`myTile59`, img`
            5 1 1 1 1 1 1 4 5 1 1 1 1 1 1 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 5 1 5 5 5 5 5 5 5 
            4 4 4 4 4 4 5 e 4 4 4 4 4 4 5 e 
            5 1 1 1 1 1 1 4 5 1 1 1 1 1 1 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 5 1 5 5 5 5 5 5 5 
            4 4 4 4 4 4 5 e d 4 4 4 4 4 4 e 
            `)
        tileUtil.replaceAllTiles(assets.tile`myTile57`, img`
            4 1 1 1 1 1 1 2 4 1 1 1 1 1 1 2 
            1 4 4 4 4 4 4 2 1 4 4 4 4 4 4 2 
            1 4 4 4 4 4 4 2 1 4 4 4 4 4 4 2 
            1 4 4 4 4 4 4 2 1 4 4 4 4 4 4 2 
            1 4 4 4 4 4 4 2 1 4 4 4 4 4 4 2 
            1 4 4 4 4 4 4 2 1 4 4 4 4 4 4 2 
            1 4 4 4 4 4 4 4 1 4 4 4 4 4 4 4 
            2 2 2 2 2 2 4 e 2 2 2 2 2 2 4 e 
            4 1 1 1 1 1 1 2 4 1 1 1 1 1 1 2 
            1 4 4 4 4 4 4 2 1 4 4 4 4 4 4 2 
            1 4 4 4 4 4 4 2 1 4 4 4 4 4 4 2 
            1 4 4 4 4 4 4 2 1 4 4 4 4 4 4 2 
            1 4 4 4 4 4 4 2 1 4 4 4 4 4 4 2 
            1 4 4 4 4 4 4 2 1 4 4 4 4 4 4 2 
            1 4 4 4 4 4 4 4 1 4 4 4 4 4 4 4 
            2 2 2 2 2 2 4 e d 2 2 2 2 2 2 e 
            `)
        sprites.setDataNumber(NPCs, "speed", 1000)
        animation.runImageAnimation(
        NPCs,
        [img`
            . . . . . . . . . . e e . . . . 
            . . . . . . . e e e e e . . . . 
            . . . . . e e e e e e c . . . . 
            . . . e e c c c c c c . . . . . 
            . . . c c 3 1 4 3 1 4 . . . . . 
            . . . . . 3 1 4 3 1 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . e e e e e e . . . . . 
            . . . . . 4 e e e e 4 . . . . . 
            . . . . . 4 e e e e 4 . . . . . 
            . . . . . . e e e 6 . . . . . . 
            . . . . . . 6 6 6 6 4 4 4 4 . . 
            . . . . . . 6 . . 6 . . . . . . 
            . . . . . . 6 . . 6 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . e e . . . . 
            . . . . . . . e e e e e . . . . 
            . . . . . e e e e e e c . . . . 
            . . . e e c c c c c c . . . . . 
            . . . c c 3 1 4 3 1 4 . . . . . 
            . . . . . 3 1 4 3 1 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . e e e e e e . . . . . 
            . . . . . 4 e e e e 4 . . . . . 
            . . . . . 4 e e e e 4 . . . . . 
            . . . . . . e e e 6 . . . . . . 
            . . . . . . 6 6 6 6 4 4 4 4 . . 
            . . . . . . 6 . . 6 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `],
        500,
        true
        )
    }
    if (levelnublucasM == 4) {
        tileUtil.replaceAllTiles(assets.tile`myTile60`, img`
            4 5 5 5 5 5 5 5 5 5 5 5 5 5 5 4 
            4 5 5 5 5 5 5 5 5 5 5 5 4 4 5 4 
            4 5 5 5 5 5 5 5 5 5 5 5 4 4 5 4 
            4 5 4 4 5 5 5 5 5 5 5 5 4 4 5 4 
            4 5 4 4 5 5 5 5 5 5 5 5 4 4 5 4 
            4 5 4 4 5 5 5 5 5 5 5 5 4 4 5 4 
            4 5 4 4 5 5 5 5 5 5 5 5 4 4 5 4 
            5 5 4 4 5 5 5 5 5 5 5 5 4 4 5 4 
            4 5 4 4 5 5 5 5 5 5 5 5 4 4 5 4 
            4 5 4 4 5 5 5 5 5 5 5 5 4 4 5 4 
            4 5 4 4 5 5 5 5 5 5 5 5 4 4 5 4 
            4 5 4 4 5 5 5 5 5 5 5 5 4 4 5 4 
            4 5 4 4 5 5 5 5 5 5 5 5 5 5 5 5 
            4 5 4 4 5 5 5 5 5 5 5 5 5 5 5 5 
            4 5 4 4 5 5 5 5 5 5 5 5 5 5 5 4 
            4 5 5 5 5 5 5 5 5 5 5 5 5 5 5 4 
            `)
        tileUtil.replaceAllTiles(assets.tile`myTile59`, img`
            5 1 1 1 1 1 1 4 5 1 1 1 1 1 1 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 5 1 5 5 5 5 5 5 5 
            4 4 4 4 4 4 5 e 4 4 4 4 4 4 5 e 
            5 1 1 1 1 1 1 4 5 1 1 1 1 1 1 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 5 1 5 5 5 5 5 5 5 
            4 4 4 4 4 4 5 e d 4 4 4 4 4 4 e 
            `)
        tileUtil.replaceAllTiles(assets.tile`myTile57`, img`
            4 1 1 1 1 1 1 2 4 1 1 1 1 1 1 2 
            1 4 4 4 4 4 4 2 1 4 4 4 4 4 4 2 
            1 4 4 4 4 4 4 2 1 4 4 4 4 4 4 2 
            1 4 4 4 4 4 4 2 1 4 4 4 4 4 4 2 
            1 4 4 4 4 4 4 2 1 4 4 4 4 4 4 2 
            1 4 4 4 4 4 4 2 1 4 4 4 4 4 4 2 
            1 4 4 4 4 4 4 4 1 4 4 4 4 4 4 4 
            2 2 2 2 2 2 4 e 2 2 2 2 2 2 4 e 
            4 1 1 1 1 1 1 2 4 1 1 1 1 1 1 2 
            1 4 4 4 4 4 4 2 1 4 4 4 4 4 4 2 
            1 4 4 4 4 4 4 2 1 4 4 4 4 4 4 2 
            1 4 4 4 4 4 4 2 1 4 4 4 4 4 4 2 
            1 4 4 4 4 4 4 2 1 4 4 4 4 4 4 2 
            1 4 4 4 4 4 4 2 1 4 4 4 4 4 4 2 
            1 4 4 4 4 4 4 4 1 4 4 4 4 4 4 4 
            2 2 2 2 2 2 4 e d 2 2 2 2 2 2 e 
            `)
        tileUtil.replaceAllTiles(assets.tile`myTile47`, img`
            5 1 1 1 1 1 1 4 5 1 1 1 1 1 1 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 4 4 4 4 4 4 4 1 5 5 5 4 
            1 5 5 4 4 4 4 4 4 4 4 4 1 5 5 4 
            1 5 5 4 4 4 4 4 4 4 4 4 1 5 5 4 
            1 5 5 4 4 2 2 4 4 2 2 4 1 5 5 5 
            4 4 4 4 4 2 2 4 4 2 2 4 1 4 5 e 
            5 1 1 4 4 4 4 4 4 4 4 4 1 1 1 4 
            1 5 5 4 4 4 4 4 4 4 4 4 1 5 5 4 
            1 5 5 4 4 4 4 4 4 4 4 4 1 5 5 4 
            1 5 5 5 4 4 4 4 4 4 4 1 5 5 5 4 
            1 5 5 5 5 4 4 5 1 4 1 5 5 5 5 4 
            1 5 5 5 5 5 5 5 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 5 1 5 5 5 5 5 5 5 
            4 4 4 4 4 4 5 e d 4 4 4 4 4 4 e 
            `)
    }
    if (levelnublucasM == 8) {
        tileUtil.replaceAllTiles(assets.tile`myTile47`, img`
            f f f f f f f f f f f f f f f f 
            f 2 2 2 2 2 2 2 2 2 2 2 2 2 2 f 
            f 2 2 2 2 2 2 2 2 2 2 2 2 2 2 f 
            f 2 2 2 2 2 2 2 2 2 2 2 2 2 2 f 
            f 2 2 2 2 2 2 2 2 2 2 2 2 2 2 f 
            f 2 2 2 2 2 2 c 2 c 2 2 2 2 2 f 
            f 2 4 4 2 c c c c 2 4 2 2 2 2 f 
            f 4 4 4 4 c a c a 4 4 4 2 4 4 f 
            f 4 4 4 4 c a c a 4 4 4 4 4 4 f 
            f 4 4 4 4 c c c c 4 4 4 4 4 4 f 
            f 4 4 4 c c c c c c 4 4 4 4 4 f 
            f 4 4 4 c c c c c c 4 4 4 4 4 f 
            f 5 5 5 c c c c c c 4 5 5 4 4 f 
            f 5 5 5 c c c c c c 5 5 5 5 5 f 
            f 5 5 5 c c c c c c 5 5 5 5 5 f 
            f f f f f f f f f f f f f f f f 
            `)
    }
    if (levelnublucasM == 14) {
        NPCs = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . 3 . . . . 4 . . . . . 
            . . . . . 3 3 . . 3 4 . . . . . 
            . . . . . 3 3 3 3 4 4 . . . . . 
            . . . . . c a 3 2 1 4 . . . . . 
            . . . . . c a 3 2 1 4 . . . . . 
            . . . . . . 3 3 4 4 4 . . . . . 
            . . . . . . . 3 3 . . . . . . . 
            . . . . . c c a a b b . . . . . 
            . . . . . 3 a a e e 4 . . . . . 
            . . . . . 3 a e e e 4 . . . . . 
            . . . . . . a e e e . . . . . . 
            . . . . . . c c c c 4 4 4 4 . . 
            . . . . . . c . . c . . . . . . 
            . . . . . . c . . c . . . . . . 
            . . . . . . 3 . . 4 . . . . . . 
            `, SpriteKind.NPCTalk)
        tiles.placeOnRandomTile(NPCs, assets.tile`myTile46`)
        sprites.setDataBoolean(NPCs, "Said something this level", true)
        sprites.setDataString(NPCs, "sayshi", "Ha Ha I am the one making all those slime mosters")
        sprites.setDataString(NPCs, "says1", "RoboCAT needed some cheep stuff to keep you at bay")
        sprites.setDataString(NPCs, "says2", "Since you destroyed 2/3 of his stuff last time")
        sprites.setDataString(NPCs, "says3", "Any ways I made a boss for you guys")
        sprites.setDataNumber(NPCs, "speed", 5000)
        NPCs.ay = 300
        animation.runImageAnimation(
        NPCs,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . 3 . . . . 4 . . . . . 
            . . . . . 3 3 . . 3 4 . . . . . 
            . . . . . 3 3 3 3 4 4 . . . . . 
            . . . . . c a 3 2 1 4 . . . . . 
            . . . . . c a 3 2 1 4 . . . . . 
            . . . . . . 3 3 4 4 4 . . . . . 
            . . . . . . . 3 3 . . . . . . . 
            . . . . . c c a a b b . . . . . 
            . . . . . 3 a a e e 4 . . . . . 
            . . . . . 3 a e e e 4 . . . . . 
            . . . . . . a e e e . . . . . . 
            . . . . . . c c c c 4 4 4 4 . . 
            . . . . . . c . . c . . . . . . 
            . . . . . . c . . c . . . . . . 
            . . . . . . 3 . . 4 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 3 . . . . 4 . . . . . 
            . . . . . 3 3 . . 3 4 . . . . . 
            . . . . . 3 3 3 3 4 4 . . . . . 
            . . . . . c a 3 2 1 4 . . . . . 
            . . . . . c a 3 2 1 4 . . . . . 
            . . . . . . 3 3 4 4 4 . . . . . 
            . . . . . . . 3 3 . . . . . . . 
            . . . . . c c a a b b . . . . . 
            . . . . . 3 a a e e 4 . . . . . 
            . . . . . 3 a e e e 4 . . . . . 
            . . . . . . a e e e . . . . . . 
            . . . . . . c c c c 4 4 4 4 . . 
            . . . . . . c . . c . . . . . . 
            . . . . . . 3 . . 4 . . . . . . 
            `],
        500,
        true
        )
        tileUtil.coverAllTiles(assets.tile`myTile74`, assets.tile`myTile64`)
        tileUtil.replaceAllTiles(assets.tile`myTile46`, assets.tile`transparency16`)
    }
    if (levelnublucasM == 15) {
        NPCs = sprites.create(img`
            ....................................................................................................
            ....................................................................................................
            ....................................................................................................
            ....................................................................................................
            ....................................................................................................
            ....................................................................................................
            ....................................................................................................
            ....................................................................................................
            ....................................................................................................
            ....................................................................................................
            ....................................................................................................
            ....................................................................................................
            ....................................................................................................
            ....................................................................................................
            ....................................................................................................
            ....................................................................................................
            ....................................................................................................
            ....................................................................................................
            ....................................................................................................
            ....................................................................................................
            ....................................................................................................
            ....................................................................................................
            ....................................................................................................
            ....................................................................................................
            ....................................................................................................
            ....................................................................................................
            ....................................................................................................
            ....................................................................................................
            ....................................................................................................
            ....................................................................................................
            ....................................................................................................
            ....................................................................................................
            ....................................................................................................
            ....................................................................................................
            ....................................................................................................
            ....................................................................................................
            ....................................................................................................
            ....................................................................................................
            ....................................................................................................
            ....................................................................................................
            .........................c..........................................................................
            ........................cc..........................................................................
            ........................cc..........................................................................
            .......................c1c..........................................................................
            .......................c1c..........................................................................
            ......................c11c..........................................................................
            ......................c11c..........................................................................
            .....6...............c111c..........................................................................
            ....666..............c111c..........................................................................
            ....66..............cbbbbc..........................................................................
            .....e..............cbbbbc..........................................................................
            ....e..............cbbbbbbc.........................................................................
            7777777............cbbbbbbc.........................................................................
            6777777...........cbbbbbbbc.........................................................................
            b777766...........cbbbbbbbc.........................................................................
            b6766bb..........cbbbbbbbbc.........................................................................
            bb6bbbb..........cbbbbbbbbc.........................................................................
            bbbbbbb.........cbbbbbbbbbc.........................................................................
            bbbbbbb.........cbbbbbbbbbc.........................................................................
            bbbbbbb........cbbbbbbbbbbc.........................................................................
            bbbbbbb.......cbbbbbbbbbbbc.........................................................................
            bbbbbbb.......cbbbbbbbbbbbc.........................................................................
            bbbbbbb......cbbbbbbbbbbbbc.........................................................................
            bbbbbbb......cbbbbbbbbbbbbbc........................................................................
            bbbbbbb.....cbbbbbbbbbbbbbbc........................................................................
            bbbbbbb.....cbbbbbbbbbbbbbbc........................................................................
            bbbbbbb....cbbbbbbbbbbbbbbbc..................c.....................................................
            bbbbbbb....cbbbbbbbbbbbbbbbc.................cc.....................................................
            bbbbbbb...cbbbbbbbbbbbbbbbbc...............cc1c.....................................................
            bbbbbbb...cbbbbbbbbbbbbbbbbc..............c111c.....................................................
            bbbbbbb..cbbbbbbbbbbbbbbbbbc.............c1111c.....................................................
            bbbbbbb..cbbbbbbbbbbbbbbbbbc...........ccb1111c.....................................................
            bbbbbbb.cbbbbbbbbbbbbbbbbbbc..........cbbbb111c.....................................................
            bbbbbbb.cbbbbbbbbbbbbbbbbbbc.........cbbbbbb11c.....................................................
            bbbbbbbcbbbbbbbbbbbbbbbbbbbbc......ccbbbbbbbbc......................................................
            bbbbbbbcbbbbbbbbbbbbbbbbbbbbc.....cbbbbbbbbbbc......................................................
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbc....cbbbbbbbbbbbc......................................................
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbc..ccbbbbbbbbbbbbc......................................................
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbc.cbbbbbbbbbbbbbbc......................................................
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbccbbbbbbbbbbbbbbbc......................................................
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbbbc......................................................
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbbc.......................................................
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbbc.......................................................
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbbc.......................................................
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbbc.......................................................
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbc.......................................................
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbc.......................................................
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbc.......................................................
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbc.......................................................
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbc........................................................
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbc........................................................
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbc........................................................
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbc........................................................
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbc........................................................
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbc........................................................
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbc........................................................
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbc.........................................................
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbc.........................................................
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbc.........................................................
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbc.........................................................
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbc.........................................................
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbc.........................................................
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbc.........................................................
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbc..........................................................
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbc...........................................................
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbc...........................................................
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbc...........................................................
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbc............................................................
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbc............................................................
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbc............................................................
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbc.............................................................
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbc.............................................................
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbc.............................................................
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbc..............................................................
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbc..............................................................
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbc..............................................................
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbc...............................................................
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbc...............................................................
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbc...............................................................
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbc................................................................
            `, SpriteKind.Nothing)
        NPCs.z = -5
        NPCs.setPosition(49, 57)
    }
}
function Enmays () {
    for (let value of tiles.getTilesByType(assets.tile`myTile44`)) {
        enty = sprites.create(assets.tile`myTile44`, SpriteKind.Enemy)
        sprites.setDataBoolean(enty, "move", false)
        sprites.setDataNumber(enty, "hp", 3)
        sprites.setDataSprite(enty, "hpim", sprites.create(img`
            . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . 
            f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f 
            f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f 
            . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . 
            . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . 
            `, SpriteKind.hp))
        sprites.readDataSprite(enty, "hpim").setFlag(SpriteFlag.Ghost, true)
        sprites.setDataNumber(enty, "type", 1)
        tiles.placeOnTile(enty, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile96`)) {
        enty = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . c c c c c c c c c c c c c . . 
            . c b b b b b b b b b b b c . . 
            . c b 1 1 b b 2 2 b 2 2 b c . . 
            . c b 1 b b b 2 2 b 2 2 b c . . 
            . c b b b b b 2 2 b 2 2 b c . . 
            . c b b b b b 2 2 b 2 2 b c . . 
            . c b b b b b b b b b b b c . . 
            . c b b b b b b 2 2 2 b b c . . 
            . c b b b b b b b 2 2 b b c . . 
            . c b b b b b b b b b b b c . . 
            . c b b b b b b b b b b b c . . 
            . c c b b c b b c b b b b c . . 
            . c c b b c c c c b b c c c . . 
            . . c b b c . . c b b c . . . . 
            . . c c c c . . c c c c . . . . 
            `, SpriteKind.Enemy)
        characterAnimations.loopFrames(
        enty,
        [img`
            . . . . . . . . . . . . . . . . 
            . . c c c c c c c c c c c c c . 
            . . c b b b b b b b b b b b c . 
            . . c b 1 1 b b 2 2 b 2 2 b c . 
            . . c b 1 b b b 2 2 b 2 2 b c . 
            . . c b b b b b 2 2 b 2 2 b c . 
            . . c b b b b b 2 2 b 2 2 b c . 
            . . c b b b b b b b b b b b c . 
            . . c b b b b b b 2 2 2 b b c . 
            . . c b b b b b b b 2 2 b b c . 
            . . c b b b b b b b b b b b c . 
            . . c b b b b b b b b b b b c . 
            . . c c b b c b b c b b b b c . 
            . . c c b b c c c c b b c c c . 
            . . . c b b c . . c b b c . . . 
            . . . c c c c . . c c c c . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . c c c c c c c c c c c c c . 
            . . c b b b b b b b b b b b c . 
            . . c b 1 1 b b 2 2 b 2 2 b c . 
            . . c b 1 b b b 2 2 b 2 2 b c . 
            . . c b b b b b 2 2 b 2 2 b c . 
            . . c b b b b b 2 2 b 2 2 b c . 
            . . c b b b b b b b b b b b c . 
            . . c b b b b b b 2 2 2 b b c . 
            . . c b b b b b b b 2 2 b b c . 
            . . c b b b b b b b b b b b c . 
            . . c b b b b b b b b b b b c . 
            . . c c b b c b b c b b b b c . 
            . . c c b b c c c c b b c c c . 
            . . . c c c c . . c c c c . . . 
            `],
        500,
        characterAnimations.rule(Predicate.NotMoving, Predicate.FacingRight)
        )
        characterAnimations.loopFrames(
        enty,
        [img`
            . . . . . . . . . . . . . . . . 
            . . c c c c c c c c c c c c c . 
            . . c b b b b b b b b b b b c . 
            . . c b 2 2 b 2 2 b b 1 1 b c . 
            . . c b 2 2 b 2 2 b b b 1 b c . 
            . . c b 2 2 b 2 2 b b b b b c . 
            . . c b 2 2 b 2 2 b b b b b c . 
            . . c b b b b b b b b b b b c . 
            . . c b b 2 2 2 b b b b b b c . 
            . . c b b 2 2 b b b b b b b c . 
            . . c b b b b b b b b b b b c . 
            . . c b b b b b b b b b b b c . 
            . . c b b b b c b b c b b c c . 
            . . c c c b b c c c c b b c c . 
            . . . . c b b c . . c b b c . . 
            . . . . c c c c . . c c c c . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . c c c c c c c c c c c c c . 
            . . c b b b b b b b b b b b c . 
            . . c b 2 2 b 2 2 b b 1 1 b c . 
            . . c b 2 2 b 2 2 b b b 1 b c . 
            . . c b 2 2 b 2 2 b b b b b c . 
            . . c b 2 2 b 2 2 b b b b b c . 
            . . c b b b b b b b b b b b c . 
            . . c b b 2 2 2 b b b b b b c . 
            . . c b b 2 2 b b b b b b b c . 
            . . c b b b b b b b b b b b c . 
            . . c b b b b b b b b b b b c . 
            . . c b b b b c b b c b b c c . 
            . . c c c b b c c c c b b c c . 
            . . . . c c c c . . c c c c . . 
            `],
        500,
        characterAnimations.rule(Predicate.NotMoving, Predicate.FacingLeft)
        )
        characterAnimations.loopFrames(
        enty,
        [img`
            . . . . . . . . . . . . . . . . 
            . . c c c c c c c c c c c c c . 
            . . c b b b b b b b b b b b c . 
            . . c b 2 2 b 2 2 b b 1 1 b c . 
            . . c b 2 2 b 2 2 b b b 1 b c . 
            . . c b 2 2 b 2 2 b b b b b c . 
            . . c b 2 2 b 2 2 b b b b b c . 
            . . c b b b b b b b b b b b c . 
            . . c b b 2 2 2 b b b b b b c . 
            . . c b b 2 2 b b b b b b b c . 
            . . c b b b b b b b b b b b c . 
            . . c b b b b b b c b b b b c . 
            . . c b c b b b b c b b c b c . 
            . . c c c b b c c c b b c c c . 
            . . . . c b b c . c c c c . . . 
            . . . . c c c c . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . c c c c c c c c c c c c c . 
            . . c b b b b b b b b b b b c . 
            . . c b 2 2 b 2 2 b b 1 1 b c . 
            . . c b 2 2 b 2 2 b b b 1 b c . 
            . . c b 2 2 b 2 2 b b b b b c . 
            . . c b 2 2 b 2 2 b b b b b c . 
            . . c b b b b b b b b b b b c . 
            . . c b b 2 2 2 b b b b b b c . 
            . . c b b 2 2 b b b b b b b c . 
            . . c b b b b b b b b b b b c . 
            . . c b b b b c b b b b b b c . 
            . . c b c b b c b b b b c b c . 
            . . c c c b b c c c b b c c c . 
            . . . . c c c c . c b b c . . . 
            . . . . . . . . . c c c c . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . c c c c c c c c c c c c c . 
            . . c b b b b b b b b b b b c . 
            . . c b 2 2 b 2 2 b b 1 1 b c . 
            . . c b 2 2 b 2 2 b b b 1 b c . 
            . . c b 2 2 b 2 2 b b b b b c . 
            . . c b 2 2 b 2 2 b b b b b c . 
            . . c b b b b b b b b b b b c . 
            . . c b b 2 2 2 b b b b b b c . 
            . . c b b 2 2 b b b b b b b c . 
            . . c b b b b b b b b b b b c . 
            . . c b b b b c b b b b b b c . 
            . . c b b b c c b b c b b b c . 
            . . c c c c c c b b c c c c c . 
            . . . . . . c c c c c . . . . . 
            . . . . . . c c c c . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . c c c c c c c c c c c c c . 
            . . c b b b b b b b b b b b c . 
            . . c b 2 2 b 2 2 b b 1 1 b c . 
            . . c b 2 2 b 2 2 b b b 1 b c . 
            . . c b 2 2 b 2 2 b b b b b c . 
            . . c b 2 2 b 2 2 b b b b b c . 
            . . c b b b b b b b b b b b c . 
            . . c b b 2 2 2 b b b b b b c . 
            . . c b b 2 2 b b b b b b b c . 
            . . c b b b b b b b b b b b c . 
            . . c b b b b b b c b b b b c . 
            . . c b b b c b b c c b b b c . 
            . . c c c c c b b c c c c c c . 
            . . . . . . c c c c c . . . . . 
            . . . . . . . c c c c . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . c c c c c c c c c c c c c . 
            . . c b b b b b b b b b b b c . 
            . . c b 2 2 b 2 2 b b 1 1 b c . 
            . . c b 2 2 b 2 2 b b b 1 b c . 
            . . c b 2 2 b 2 2 b b b b b c . 
            . . c b 2 2 b 2 2 b b b b b c . 
            . . c b b b b b b b b b b b c . 
            . . c b b 2 2 2 b b b b b b c . 
            . . c b b 2 2 b b b b b b b c . 
            . . c b b b b b b b b b b b c . 
            . . c b b b b c b b b b b b c . 
            . . c b c b b c b b b c b b c . 
            . . c c c b b c c b b c c c c . 
            . . . . c c c c c b b c . . . . 
            . . . . . . . . c c c c . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . c c c c c c c c c c c c c . 
            . . c b b b b b b b b b b b c . 
            . . c b 2 2 b 2 2 b b 1 1 b c . 
            . . c b 2 2 b 2 2 b b b 1 b c . 
            . . c b 2 2 b 2 2 b b b b b c . 
            . . c b 2 2 b 2 2 b b b b b c . 
            . . c b b b b b b b b b b b c . 
            . . c b b 2 2 2 b b b b b b c . 
            . . c b b 2 2 b b b b b b b c . 
            . . c b b b b b b b b b b b c . 
            . . c b b b b b b b b b b b c . 
            . . c b b b c b b b b b c b c . 
            . . c c b b c c c c b b c c c . 
            . . . c b b c . . c b b c . . . 
            . . . c c c c . . c c c c . . . 
            `],
        100,
        characterAnimations.rule(Predicate.MovingLeft, Predicate.HittingWallDown)
        )
        characterAnimations.loopFrames(
        enty,
        [img`
            . . . . . . . . . . . . . . . . 
            . . c c c c c c c c c c c c c . 
            . . c b b b b b b b b b b b c . 
            . . c b 1 1 b b 2 2 b 2 2 b c . 
            . . c b 1 b b b 2 2 b 2 2 b c . 
            . . c b b b b b 2 2 b 2 2 b c . 
            . . c b b b b b 2 2 b 2 2 b c . 
            . . c b b b b b b b b b b b c . 
            . . c b b b b b b 2 2 2 b b c . 
            . . c b b b b b b b 2 2 b b c . 
            . . c b b b b b b b b b b b c . 
            . . c b b b b c b b b b b b c . 
            . . c b c b b c b b b b c b c . 
            . . c c c b b c c c b b c c c . 
            . . . . c c c c . c b b c . . . 
            . . . . . . . . . c c c c . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . c c c c c c c c c c c c c . 
            . . c b b b b b b b b b b b c . 
            . . c b 1 1 b b 2 2 b 2 2 b c . 
            . . c b 1 b b b 2 2 b 2 2 b c . 
            . . c b b b b b 2 2 b 2 2 b c . 
            . . c b b b b b 2 2 b 2 2 b c . 
            . . c b b b b b b b b b b b c . 
            . . c b b b b b b 2 2 2 b b c . 
            . . c b b b b b b b 2 2 b b c . 
            . . c b b b b b b b b b b b c . 
            . . c b b b b b b c b b b b c . 
            . . c b c b b b b c b b c b c . 
            . . c c c b b c c c b b c c c . 
            . . . . c b b c . c c c c . . . 
            . . . . c c c c . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . c c c c c c c c c c c c c . 
            . . c b b b b b b b b b b b c . 
            . . c b 1 1 b b 2 2 b 2 2 b c . 
            . . c b 1 b b b 2 2 b 2 2 b c . 
            . . c b b b b b 2 2 b 2 2 b c . 
            . . c b b b b b 2 2 b 2 2 b c . 
            . . c b b b b b b b b b b b c . 
            . . c b b b b b b 2 2 2 b b c . 
            . . c b b b b b b b 2 2 b b c . 
            . . c b b b b b b b b b b b c . 
            . . c b b b b b b c b b b b c . 
            . . c b b b c b b c c b b b c . 
            . . c c c c c b b c c c c c c . 
            . . . . . . c c c c c . . . . . 
            . . . . . . . c c c c . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . c c c c c c c c c c c c c . 
            . . c b b b b b b b b b b b c . 
            . . c b 1 1 b b 2 2 b 2 2 b c . 
            . . c b 1 b b b 2 2 b 2 2 b c . 
            . . c b b b b b 2 2 b 2 2 b c . 
            . . c b b b b b 2 2 b 2 2 b c . 
            . . c b b b b b b b b b b b c . 
            . . c b b b b b b 2 2 2 b b c . 
            . . c b b b b b b b 2 2 b b c . 
            . . c b b b b b b b b b b b c . 
            . . c b b b b c b b b b b b c . 
            . . c b b b c c b b c b b b c . 
            . . c c c c c c b b c c c c c . 
            . . . . . . c c c c c . . . . . 
            . . . . . . c c c c . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . c c c c c c c c c c c c c . 
            . . c b b b b b b b b b b b c . 
            . . c b 1 1 b b 2 2 b 2 2 b c . 
            . . c b 1 b b b 2 2 b 2 2 b c . 
            . . c b b b b b 2 2 b 2 2 b c . 
            . . c b b b b b 2 2 b 2 2 b c . 
            . . c b b b b b b b b b b b c . 
            . . c b b b b b b 2 2 2 b b c . 
            . . c b b b b b b b 2 2 b b c . 
            . . c b b b b b b b b b b b c . 
            . . c b b b b b b c b b b b c . 
            . . c b b c b b b c b b c b c . 
            . . c c c c b b c c b b c c c . 
            . . . . . c b b c c c c c . . . 
            . . . . . c c c c . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . c c c c c c c c c c c c c . 
            . . c b b b b b b b b b b b c . 
            . . c b 1 1 b b 2 2 b 2 2 b c . 
            . . c b 1 b b b 2 2 b 2 2 b c . 
            . . c b b b b b 2 2 b 2 2 b c . 
            . . c b b b b b 2 2 b 2 2 b c . 
            . . c b b b b b b b b b b b c . 
            . . c b b b b b b 2 2 2 b b c . 
            . . c b b b b b b b 2 2 b b c . 
            . . c b b b b b b b b b b b c . 
            . . c b b b b b b b b b b b c . 
            . . c b c b b b b b c b b b c . 
            . . c c c b b c c c c b b c c . 
            . . . . c b b c . . c b b c . . 
            . . . . c c c c . . c c c c . . 
            `],
        100,
        characterAnimations.rule(Predicate.MovingRight, Predicate.HittingWallDown)
        )
        if (Math.percentChance(50)) {
            enty.vx = 50
        } else {
            enty.vx = -50
        }
        enty.ay = 200
        sprites.setDataBoolean(enty, "move", false)
        sprites.setDataNumber(enty, "hp", 5)
        sprites.setDataSprite(enty, "hpim", sprites.create(img`
            . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . 
            f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f 
            f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f 
            . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . 
            . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . 
            `, SpriteKind.hp))
        sprites.readDataSprite(enty, "hpim").setFlag(SpriteFlag.Ghost, true)
        sprites.setDataNumber(enty, "type", 2)
        tiles.placeOnTile(enty, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile50`)) {
        enty = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . f f f f f f f f f f f f f . . 
            . f 3 3 3 3 3 3 3 3 3 3 3 f . . 
            . f 3 1 1 3 3 f f 3 f f 3 f . . 
            . f 3 1 3 3 3 f f 3 f f 3 f . . 
            . f 3 3 3 3 3 f f 3 f f 3 f . . 
            . f 3 3 3 3 3 f f 3 f f 3 f . . 
            . f 3 3 3 3 3 3 3 3 3 3 3 f . . 
            . f 3 3 3 3 3 3 f f f 3 3 f . . 
            . f 3 3 3 3 3 3 3 f f 3 3 f . . 
            . f 3 3 3 3 3 3 3 3 3 3 3 f . . 
            . f 3 3 3 3 3 3 3 3 3 3 3 f . . 
            . f f 3 3 f 3 3 f 3 3 3 3 f . . 
            . f f 3 3 f f f f 3 3 f f f . . 
            . . f 3 3 f . . f 3 3 f . . . . 
            . . f f f f . . f f f f . . . . 
            `, SpriteKind.Enemy)
        characterAnimations.loopFrames(
        enty,
        [img`
            . . . . . . . . . . . . . . . . 
            . . f f f f f f f f f f f f f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 1 1 3 3 f f 3 f f 3 f . 
            . . f 3 1 3 3 3 f f 3 f f 3 f . 
            . . f 3 3 3 3 3 f f 3 f f 3 f . 
            . . f 3 3 3 3 3 f f 3 f f 3 f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 3 3 3 3 3 f f f 3 3 f . 
            . . f 3 3 3 3 3 3 3 f f 3 3 f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f f 3 3 f 3 3 f 3 3 3 3 f . 
            . . f f 3 3 f f f f 3 3 f f f . 
            . . . f 3 3 f . . f 3 3 f . . . 
            . . . f f f f . . f f f f . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . f f f f f f f f f f f f f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 1 1 3 3 f f 3 f f 3 f . 
            . . f 3 1 3 3 3 f f 3 f f 3 f . 
            . . f 3 3 3 3 3 f f 3 f f 3 f . 
            . . f 3 3 3 3 3 f f 3 f f 3 f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 3 3 3 3 3 f f f 3 3 f . 
            . . f 3 3 3 3 3 3 3 f f 3 3 f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f f 3 3 f 3 3 f 3 3 3 3 f . 
            . . f f 3 3 f f f f 3 3 f f f . 
            . . . f f f f . . f f f f . . . 
            `],
        500,
        characterAnimations.rule(Predicate.NotMoving, Predicate.FacingRight)
        )
        characterAnimations.loopFrames(
        enty,
        [img`
            . . . . . . . . . . . . . . . . 
            . . f f f f f f f f f f f f f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 f f 3 f f 3 3 1 1 3 f . 
            . . f 3 f f 3 f f 3 3 3 1 3 f . 
            . . f 3 f f 3 f f 3 3 3 3 3 f . 
            . . f 3 f f 3 f f 3 3 3 3 3 f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 3 f f f 3 3 3 3 3 3 f . 
            . . f 3 3 f f 3 3 3 3 3 3 3 f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 3 3 3 f 3 3 f 3 3 f f . 
            . . f f f 3 3 f f f f 3 3 f f . 
            . . . . f 3 3 f . . f 3 3 f . . 
            . . . . f f f f . . f f f f . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . f f f f f f f f f f f f f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 f f 3 f f 3 3 1 1 3 f . 
            . . f 3 f f 3 f f 3 3 3 1 3 f . 
            . . f 3 f f 3 f f 3 3 3 3 3 f . 
            . . f 3 f f 3 f f 3 3 3 3 3 f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 3 f f f 3 3 3 3 3 3 f . 
            . . f 3 3 f f 3 3 3 3 3 3 3 f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 3 3 3 f 3 3 f 3 3 f f . 
            . . f f f 3 3 f f f f 3 3 f f . 
            . . . . f f f f . . f f f f . . 
            `],
        500,
        characterAnimations.rule(Predicate.NotMoving, Predicate.FacingLeft)
        )
        characterAnimations.loopFrames(
        enty,
        [img`
            . . . . . . . . . . . . . . . . 
            . . f f f f f f f f f f f f f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 f f 3 f f 3 3 1 1 3 f . 
            . . f 3 f f 3 f f 3 3 3 1 3 f . 
            . . f 3 f f 3 f f 3 3 3 3 3 f . 
            . . f 3 f f 3 f f 3 3 3 3 3 f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 3 f f f 3 3 3 3 3 3 f . 
            . . f 3 3 f f 3 3 3 3 3 3 3 f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 3 3 3 3 3 f 3 3 3 3 f . 
            . . f 3 f 3 3 3 3 f 3 3 f 3 f . 
            . . f f f 3 3 f f f 3 3 f f f . 
            . . . . f 3 3 f . f f f f . . . 
            . . . . f f f f . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . f f f f f f f f f f f f f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 f f 3 f f 3 3 1 1 3 f . 
            . . f 3 f f 3 f f 3 3 3 1 3 f . 
            . . f 3 f f 3 f f 3 3 3 3 3 f . 
            . . f 3 f f 3 f f 3 3 3 3 3 f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 3 f f f 3 3 3 3 3 3 f . 
            . . f 3 3 f f 3 3 3 3 3 3 3 f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 3 3 3 f 3 3 3 3 3 3 f . 
            . . f 3 f 3 3 f 3 3 3 3 f 3 f . 
            . . f f f 3 3 f f f 3 3 f f f . 
            . . . . f f f f . f 3 3 f . . . 
            . . . . . . . . . f f f f . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . f f f f f f f f f f f f f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 f f 3 f f 3 3 1 1 3 f . 
            . . f 3 f f 3 f f 3 3 3 1 3 f . 
            . . f 3 f f 3 f f 3 3 3 3 3 f . 
            . . f 3 f f 3 f f 3 3 3 3 3 f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 3 f f f 3 3 3 3 3 3 f . 
            . . f 3 3 f f 3 3 3 3 3 3 3 f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 3 3 3 f 3 3 3 3 3 3 f . 
            . . f 3 3 3 f f 3 3 f 3 3 3 f . 
            . . f f f f f f 3 3 f f f f f . 
            . . . . . . f f f f f . . . . . 
            . . . . . . f f f f . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . f f f f f f f f f f f f f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 f f 3 f f 3 3 1 1 3 f . 
            . . f 3 f f 3 f f 3 3 3 1 3 f . 
            . . f 3 f f 3 f f 3 3 3 3 3 f . 
            . . f 3 f f 3 f f 3 3 3 3 3 f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 3 f f f 3 3 3 3 3 3 f . 
            . . f 3 3 f f 3 3 3 3 3 3 3 f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 3 3 3 3 3 f 3 3 3 3 f . 
            . . f 3 3 3 f 3 3 f f 3 3 3 f . 
            . . f f f f f 3 3 f f f f f f . 
            . . . . . . f f f f f . . . . . 
            . . . . . . . f f f f . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . f f f f f f f f f f f f f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 f f 3 f f 3 3 1 1 3 f . 
            . . f 3 f f 3 f f 3 3 3 1 3 f . 
            . . f 3 f f 3 f f 3 3 3 3 3 f . 
            . . f 3 f f 3 f f 3 3 3 3 3 f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 3 f f f 3 3 3 3 3 3 f . 
            . . f 3 3 f f 3 3 3 3 3 3 3 f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 3 3 3 f 3 3 3 3 3 3 f . 
            . . f 3 f 3 3 f 3 3 3 f 3 3 f . 
            . . f f f 3 3 f f 3 3 f f f f . 
            . . . . f f f f f 3 3 f . . . . 
            . . . . . . . . f f f f . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . f f f f f f f f f f f f f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 f f 3 f f 3 3 1 1 3 f . 
            . . f 3 f f 3 f f 3 3 3 1 3 f . 
            . . f 3 f f 3 f f 3 3 3 3 3 f . 
            . . f 3 f f 3 f f 3 3 3 3 3 f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 3 f f f 3 3 3 3 3 3 f . 
            . . f 3 3 f f 3 3 3 3 3 3 3 f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 3 3 f 3 3 3 3 3 f 3 f . 
            . . f f 3 3 f f f f 3 3 f f f . 
            . . . f 3 3 f . . f 3 3 f . . . 
            . . . f f f f . . f f f f . . . 
            `],
        100,
        characterAnimations.rule(Predicate.MovingLeft, Predicate.HittingWallDown)
        )
        characterAnimations.loopFrames(
        enty,
        [img`
            . . . . . . . . . . . . . . . . 
            . . f f f f f f f f f f f f f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 1 1 3 3 f f 3 f f 3 f . 
            . . f 3 1 3 3 3 f f 3 f f 3 f . 
            . . f 3 3 3 3 3 f f 3 f f 3 f . 
            . . f 3 3 3 3 3 f f 3 f f 3 f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 3 3 3 3 3 f f f 3 3 f . 
            . . f 3 3 3 3 3 3 3 f f 3 3 f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 3 3 3 f 3 3 3 3 3 3 f . 
            . . f 3 f 3 3 f 3 3 3 3 f 3 f . 
            . . f f f 3 3 f f f 3 3 f f f . 
            . . . . f f f f . f 3 3 f . . . 
            . . . . . . . . . f f f f . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . f f f f f f f f f f f f f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 1 1 3 3 f f 3 f f 3 f . 
            . . f 3 1 3 3 3 f f 3 f f 3 f . 
            . . f 3 3 3 3 3 f f 3 f f 3 f . 
            . . f 3 3 3 3 3 f f 3 f f 3 f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 3 3 3 3 3 f f f 3 3 f . 
            . . f 3 3 3 3 3 3 3 f f 3 3 f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 3 3 3 3 3 f 3 3 3 3 f . 
            . . f 3 f 3 3 3 3 f 3 3 f 3 f . 
            . . f f f 3 3 f f f 3 3 f f f . 
            . . . . f 3 3 f . f f f f . . . 
            . . . . f f f f . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . f f f f f f f f f f f f f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 1 1 3 3 f f 3 f f 3 f . 
            . . f 3 1 3 3 3 f f 3 f f 3 f . 
            . . f 3 3 3 3 3 f f 3 f f 3 f . 
            . . f 3 3 3 3 3 f f 3 f f 3 f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 3 3 3 3 3 f f f 3 3 f . 
            . . f 3 3 3 3 3 3 3 f f 3 3 f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 3 3 3 3 3 f 3 3 3 3 f . 
            . . f 3 3 3 f 3 3 f f 3 3 3 f . 
            . . f f f f f 3 3 f f f f f f . 
            . . . . . . f f f f f . . . . . 
            . . . . . . . f f f f . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . f f f f f f f f f f f f f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 1 1 3 3 f f 3 f f 3 f . 
            . . f 3 1 3 3 3 f f 3 f f 3 f . 
            . . f 3 3 3 3 3 f f 3 f f 3 f . 
            . . f 3 3 3 3 3 f f 3 f f 3 f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 3 3 3 3 3 f f f 3 3 f . 
            . . f 3 3 3 3 3 3 3 f f 3 3 f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 3 3 3 f 3 3 3 3 3 3 f . 
            . . f 3 3 3 f f 3 3 f 3 3 3 f . 
            . . f f f f f f 3 3 f f f f f . 
            . . . . . . f f f f f . . . . . 
            . . . . . . f f f f . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . f f f f f f f f f f f f f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 1 1 3 3 f f 3 f f 3 f . 
            . . f 3 1 3 3 3 f f 3 f f 3 f . 
            . . f 3 3 3 3 3 f f 3 f f 3 f . 
            . . f 3 3 3 3 3 f f 3 f f 3 f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 3 3 3 3 3 f f f 3 3 f . 
            . . f 3 3 3 3 3 3 3 f f 3 3 f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 3 3 3 3 3 f 3 3 3 3 f . 
            . . f 3 3 f 3 3 3 f 3 3 f 3 f . 
            . . f f f f 3 3 f f 3 3 f f f . 
            . . . . . f 3 3 f f f f f . . . 
            . . . . . f f f f . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . f f f f f f f f f f f f f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 1 1 3 3 f f 3 f f 3 f . 
            . . f 3 1 3 3 3 f f 3 f f 3 f . 
            . . f 3 3 3 3 3 f f 3 f f 3 f . 
            . . f 3 3 3 3 3 f f 3 f f 3 f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 3 3 3 3 3 f f f 3 3 f . 
            . . f 3 3 3 3 3 3 3 f f 3 3 f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 f 3 3 3 3 3 f 3 3 3 f . 
            . . f f f 3 3 f f f f 3 3 f f . 
            . . . . f 3 3 f . . f 3 3 f . . 
            . . . . f f f f . . f f f f . . 
            `],
        100,
        characterAnimations.rule(Predicate.MovingRight, Predicate.HittingWallDown)
        )
        if (Math.percentChance(50)) {
            enty.vx = 50
        } else {
            enty.vx = -50
        }
        enty.ay = 200
        sprites.setDataBoolean(enty, "move", false)
        sprites.setDataNumber(enty, "hp", 3)
        sprites.setDataSprite(enty, "hpim", sprites.create(img`
            . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . 
            f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f 
            f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f 
            . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . 
            . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . 
            `, SpriteKind.hp))
        sprites.readDataSprite(enty, "hpim").setFlag(SpriteFlag.Ghost, true)
        sprites.setDataNumber(enty, "type", 2)
        tiles.placeOnTile(enty, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile73`)) {
        enty = sprites.create(img`
            ..................
            .....fffffffffff..
            .....f333333333f..
            .....f333333333f..
            .....f333ff3ff3f..
            .....f333ff3ff3f..
            .....f333ff3ff3f..
            .....f333ff3ff3f..
            .....f333333333f..
            .....f3333fff33f..
            .....f33333ff33f..
            ..ffffff333333ff..
            fffbbbc3333333f...
            fbfbbc33333333ff..
            fcfcceee333333ff..
            f3f33ceee33333ff..
            f3f333cceee333ff..
            f3f33333ceeee3ff..
            f3f333333cceeeff..
            f3f33333333cceff..
            fff3333333333cff..
            ..f33333333333ff..
            ..ff33f33f3333f...
            ..ff33ffff33fff...
            ...f33f..f33f.....
            ...ffff..ffff.....
            `, SpriteKind.Enemy)
        characterAnimations.loopFrames(
        enty,
        [img`
            ..................
            ......fffffffffff.
            ......f333333333f.
            ......f333333333f.
            ......f333ff3ff3f.
            ......f333ff3ff3f.
            ......f333ff3ff3f.
            ......f333ff3ff3f.
            ......f333333333f.
            ......f3333fff33f.
            ......f33333ff33f.
            ...ffffff333333ff.
            .fffbbbc3333333f..
            .fbfbbc33333333ff.
            .fcfcceee333333ff.
            .f3f33ceee33333ff.
            .f3f333cceee333ff.
            .f3f33333ceeee3ff.
            .f3f333333cceeeff.
            .f3f33333333cceff.
            .fff3333333333cff.
            ...f33333333333ff.
            ...ff33f33f3333f..
            ...ff33ffff33fff..
            ....f33f..f33f....
            ....ffff..ffff....
            `,img`
            ..................
            ..................
            ......fffffffffff.
            ......f333333333f.
            ......f333333333f.
            ......f333ff3ff3f.
            ......f333ff3ff3f.
            ......f333ff3ff3f.
            ......f333ff3ff3f.
            ......f333333333f.
            ......f3333fff33f.
            ......f33333ff33f.
            ...ffffff333333ff.
            .fffbbbc3333333f..
            .fbfbbc33333333ff.
            .fcfcceee333333ff.
            .f3f33ceee33333ff.
            .f3f333cceee333ff.
            .f3f33333ceeee3ff.
            .f3f333333cceeeff.
            .fff33333333cceff.
            ...f3333333333cff.
            ...ff33f33f3333f..
            ...ff33ffff33fff..
            ....f33f..f33f....
            ....ffff..ffff....
            `],
        500,
        characterAnimations.rule(Predicate.NotMoving, Predicate.FacingRight)
        )
        characterAnimations.loopFrames(
        enty,
        [img`
            ..................
            .fffffffffff......
            .f333333333f......
            .f333333333f......
            .f3ff3ff333f......
            .f3ff3ff333f......
            .f3ff3ff333f......
            .f3ff3ff333f......
            .f333333333f......
            .f33fff3333f......
            .f33ff33333f......
            .ff333333ffffff...
            ..f3333333cbbbfff.
            .ff33333333cbbfbf.
            .ff333333eeeccfcf.
            .ff33333eeec33f3f.
            .ff333eeecc333f3f.
            .ff3eeeec33333f3f.
            .ffeeecc333333f3f.
            .ffecc33333333f3f.
            .ffc3333333333fff.
            .ff33333333333f...
            ..f3333f33f33ff...
            ..fff33ffff33ff...
            ....f33f..f33f....
            ....ffff..ffff....
            `,img`
            ..................
            ..................
            .fffffffffff......
            .f333333333f......
            .f333333333f......
            .f3ff3ff333f......
            .f3ff3ff333f......
            .f3ff3ff333f......
            .f3ff3ff333f......
            .f333333333f......
            .f33fff3333f......
            .f33ff33333f......
            .ff333333ffffff...
            ..f3333333cbbbfff.
            .ff33333333cbbfbf.
            .ff333333eeeccfcf.
            .ff33333eeec33f3f.
            .ff333eeecc333f3f.
            .ff3eeeec33333f3f.
            .ffeeecc333333f3f.
            .ffecc33333333fff.
            .ffc3333333333f...
            ..f3333f33f33ff...
            ..fff33ffff33ff...
            ....f33f..f33f....
            ....ffff..ffff....
            `],
        500,
        characterAnimations.rule(Predicate.NotMoving, Predicate.FacingLeft)
        )
        characterAnimations.loopFrames(
        enty,
        [img`
            .fffffffffff......
            .f333333333f......
            .f333333333f......
            .f3ff3ff333f......
            .f3ff3ff333f......
            .f3ff3ff333f......
            .f3ff3ff333f......
            .f333333333f......
            .f33fff3333f......
            .f33ff33333f......
            .ff333333ffffff...
            .ff3333333cbbbf...
            .ff33333333cbbfff.
            .ff333333eeeccfbf.
            .ff33333eeec33fcf.
            .ff333eeecc333f3f.
            .ff3eeeec33333f3f.
            .ffeeecc333333f3f.
            .ffecc33333333f3f.
            .ffc3333333333f3f.
            ..f33333333333fff.
            ..f333333f3333f...
            ..f3f3333f33f3f...
            ..fff33fff33fff...
            ....f33f.ffff.....
            ....ffff..........
            `,img`
            .fffffffffff......
            .f333333333f......
            .f333333333f......
            .f3ff3ff333f......
            .f3ff3ff333f......
            .f3ff3ff333f......
            .f3ff3ff333f......
            .f333333333f......
            .f33fff3333f......
            .f33ff33333f......
            .ff333333ffffff...
            ..f3333333cbbbfff.
            .ff33333333cbbfbf.
            .ff333333eeeccfcf.
            .ff33333eeec33f3f.
            .ff333eeecc333f3f.
            .ff3eeeec33333f3f.
            .ffeeecc333333f3f.
            .ffecc33333333f3f.
            .ffc3333333333fff.
            .ff33333333333f...
            ..f3333f333333f...
            ..f3f33f3333f3f...
            ..fff33fff33fff...
            ....ffff.f33f.....
            .........ffff.....
            `,img`
            .fffffffffff......
            .f333333333f......
            .f333333333f......
            .f3ff3ff333f......
            .f3ff3ff333f......
            .f3ff3ff333f......
            .f3ff3ff333f......
            .f333333333f......
            .f33fff3333f......
            .f33ff33333f......
            .ff333333ffffffff.
            ..f3333333cbbbfbf.
            ..f33333333cbbfcf.
            .ff333333eeeccf3f.
            .ff33333eeec33f3f.
            .ff333eeecc333f3f.
            .ff3eeeec33333f3f.
            .ffeeecc333333f3f.
            .ffecc33333333fff.
            .ffc3333333333f...
            .ff33333333333f...
            .ff3333f333333f...
            ..f333ff33f333f...
            ..ffffff33fffff...
            ......fffff.......
            ......ffff........
            `,img`
            .fffffffffff......
            .f333333333f......
            .f333333333f......
            .f3ff3ff333f......
            .f3ff3ff333f......
            .f3ff3ff333f......
            .f3ff3ff333f......
            .f333333333f......
            .f33fff3333f......
            .f33ff33333f......
            .ff333333ffffff...
            ..f3333333cbbbfff.
            .ff33333333cbbfbf.
            .ff333333eeeccfcf.
            .ff33333eeec33f3f.
            .ff333eeecc333f3f.
            .ff3eeeec33333f3f.
            .ffeeecc333333f3f.
            .ffecc33333333f3f.
            .ffc3333333333fff.
            .ff33333333333f...
            ..f333333f3333f...
            ..f333f33ff333f...
            ..fffff33ffffff...
            ......fffff.......
            .......ffff.......
            `,img`
            ..................
            .fffffffffff......
            .f333333333f......
            .f333333333f......
            .f3ff3ff333f......
            .f3ff3ff333f......
            .f3ff3ff333f......
            .f3ff3ff333f......
            .f333333333f......
            .f33fff3333f......
            .f33ff33333f......
            .ff333333ffffffff.
            ..f3333333cbbbfbf.
            .ff33333333cbbfcf.
            .ff333333eeeccf3f.
            .ff33333eeec33f3f.
            .ff333eeecc333f3f.
            .ff3eeeec33333f3f.
            .ffeeecc333333f3f.
            .ffecc33333333fff.
            .ffc3333333333f...
            .ff33333333333f...
            ..f3f33f333f33f...
            ..fff33ff33ffff...
            ....fffff33f......
            ........ffff......
            `,img`
            ..................
            .fffffffffff......
            .f333333333f......
            .f333333333f......
            .f3ff3ff333f......
            .f3ff3ff333f......
            .f3ff3ff333f......
            .f3ff3ff333f......
            .f333333333f......
            .f33fff3333f......
            .f33ff33333f......
            .ff333333ffffff...
            ..f3333333cbbbfff.
            .ff33333333cbbfbf.
            .ff333333eeeccfcf.
            .ff33333eeec33f3f.
            .ff333eeecc333f3f.
            .ff3eeeec33333f3f.
            .ffeeecc333333f3f.
            .ffecc33333333f3f.
            .ffc3333333333fff.
            .ff33333333333f...
            ..f333f33333f3f...
            ..ff33ffff33fff...
            ...f33f..f33f.....
            ...ffff..ffff.....
            `],
        100,
        characterAnimations.rule(Predicate.MovingLeft, Predicate.HittingWallDown)
        )
        characterAnimations.loopFrames(
        enty,
        [img`
            ......fffffffffff.
            ......f333333333f.
            ......f333333333f.
            ......f333ff3ff3f.
            ......f333ff3ff3f.
            ......f333ff3ff3f.
            ......f333ff3ff3f.
            ......f333333333f.
            ......f3333fff33f.
            ......f33333ff33f.
            ...ffffff333333ff.
            ...fbbbc3333333ff.
            .fffbbc33333333ff.
            .fbfcceee333333ff.
            .fcf33ceee33333ff.
            .f3f333cceee333ff.
            .f3f33333ceeee3ff.
            .f3f333333cceeeff.
            .f3f33333333cceff.
            .f3f3333333333cff.
            .fff33333333333f..
            ...f3333f333333f..
            ...f3f33f3333f3f..
            ...fff33fff33fff..
            .....ffff.f33f....
            ..........ffff....
            `,img`
            ......fffffffffff.
            ......f333333333f.
            ......f333333333f.
            ......f333ff3ff3f.
            ......f333ff3ff3f.
            ......f333ff3ff3f.
            ......f333ff3ff3f.
            ......f333333333f.
            ......f3333fff33f.
            ......f33333ff33f.
            ...ffffff333333ff.
            .fffbbbc3333333f..
            .fbfbbc33333333ff.
            .fcfcceee333333ff.
            .f3f33ceee33333ff.
            .f3f333cceee333ff.
            .f3f33333ceeee3ff.
            .f3f333333cceeeff.
            .f3f33333333cceff.
            .fff3333333333cff.
            ...f33333333333ff.
            ...f333333f3333f..
            ...f3f3333f33f3f..
            ...fff33fff33fff..
            .....f33f.ffff....
            .....ffff.........
            `,img`
            ......fffffffffff.
            ......f333333333f.
            ......f333333333f.
            ......f333ff3ff3f.
            ......f333ff3ff3f.
            ......f333ff3ff3f.
            ......f333ff3ff3f.
            ......f333333333f.
            ......f3333fff33f.
            ......f33333ff33f.
            .ffffffff333333ff.
            .fbfbbbc3333333f..
            .fcfbbc33333333f..
            .f3fcceee333333ff.
            .f3f33ceee33333ff.
            .f3f333cceee333ff.
            .f3f33333ceeee3ff.
            .f3f333333cceeeff.
            .fff33333333cceff.
            ...f3333333333cff.
            ...f33333333333ff.
            ...f333333f3333ff.
            ...f333f33ff333f..
            ...fffff33ffffff..
            .......fffff......
            ........ffff......
            `,img`
            ......fffffffffff.
            ......f333333333f.
            ......f333333333f.
            ......f333ff3ff3f.
            ......f333ff3ff3f.
            ......f333ff3ff3f.
            ......f333ff3ff3f.
            ......f333333333f.
            ......f3333fff33f.
            ......f33333ff33f.
            ...ffffff333333ff.
            .fffbbbc3333333f..
            .fbfbbc33333333ff.
            .fcfcceee333333ff.
            .f3f33ceee33333ff.
            .f3f333cceee333ff.
            .f3f33333ceeee3ff.
            .f3f333333cceeeff.
            .f3f33333333cceff.
            .fff3333333333cff.
            ...f33333333333ff.
            ...f3333f333333f..
            ...f333ff33f333f..
            ...ffffff33fffff..
            .......fffff......
            .......ffff.......
            `,img`
            ..................
            ......fffffffffff.
            ......f333333333f.
            ......f333333333f.
            ......f333ff3ff3f.
            ......f333ff3ff3f.
            ......f333ff3ff3f.
            ......f333ff3ff3f.
            ......f333333333f.
            ......f3333fff33f.
            ......f33333ff33f.
            .ffffffff333333ff.
            .fbfbbbc3333333f..
            .fcfbbc33333333ff.
            .f3fcceee333333ff.
            .f3f33ceee33333ff.
            .f3f333cceee333ff.
            .f3f33333ceeee3ff.
            .f3f333333cceeeff.
            .fff33333333cceff.
            ...f3333333333cff.
            ...f33333333333ff.
            ...f33f333f33f3f..
            ...ffff33ff33fff..
            ......f33fffff....
            ......ffff........
            `,img`
            ..................
            ......fffffffffff.
            ......f333333333f.
            ......f333333333f.
            ......f333ff3ff3f.
            ......f333ff3ff3f.
            ......f333ff3ff3f.
            ......f333ff3ff3f.
            ......f333333333f.
            ......f3333fff33f.
            ......f33333ff33f.
            ...ffffff333333ff.
            .fffbbbc3333333f..
            .fbfbbc33333333ff.
            .fcfcceee333333ff.
            .f3f33ceee33333ff.
            .f3f333cceee333ff.
            .f3f33333ceeee3ff.
            .f3f333333cceeeff.
            .f3f33333333cceff.
            .fff3333333333cff.
            ...f33333333333ff.
            ...f3f33333f333f..
            ...fff33ffff33ff..
            .....f33f..f33f...
            .....ffff..ffff...
            `],
        100,
        characterAnimations.rule(Predicate.MovingRight, Predicate.HittingWallDown)
        )
        if (Math.percentChance(50)) {
            enty.vx = 50
        } else {
            enty.vx = -50
        }
        enty.ay = 200
        sprites.setDataBoolean(enty, "move", false)
        sprites.setDataNumber(enty, "hp", 9)
        sprites.setDataSprite(enty, "hpim", sprites.create(img`
            . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . 
            f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f 
            f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f 
            . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . 
            . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . 
            `, SpriteKind.hp))
        sprites.readDataSprite(enty, "hpim").setFlag(SpriteFlag.Ghost, true)
        sprites.setDataNumber(enty, "type", 4)
        tiles.placeOnTile(enty, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile52`)) {
        enty = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . c c c c c c c c c c c . . . 
            . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
            . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
            . c 1 c c 1 c c 1 1 1 1 1 c . . 
            . c 1 c c 1 c c 1 1 1 1 1 c . . 
            . c 1 c c 1 c c 1 1 1 1 1 c . . 
            . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
            . c 1 1 1 c c 1 1 1 1 1 1 c . . 
            . c 1 1 c c c 1 1 1 1 1 1 c . . 
            . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
            . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
            . c c c c c c c c c 1 1 c c . . 
            . . c 1 c 1 c . . c 1 1 c . . . 
            . . c c c c c . . c c 1 c . . . 
            . . . . . . . . . . c c c . . . 
            `, SpriteKind.Enemy)
        characterAnimations.loopFrames(
        enty,
        [img`
            . . . . . . . . . . . . . . . . 
            . . c c c c c c c c c c c . . . 
            . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
            . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
            . c 1 c c 1 c c 1 1 1 1 1 c . . 
            . c 1 c c 1 c c 1 1 1 1 1 c . . 
            . c 1 c c 1 c c 1 1 1 1 1 c . . 
            . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
            . c 1 1 1 c c 1 1 1 1 1 1 c . . 
            . c 1 1 c c c 1 1 1 1 1 1 c . . 
            . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
            . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
            . c c c c c c c c c 1 1 c c . . 
            . . c 1 c 1 c . . c 1 1 c . . . 
            . . c c c c c . . c c 1 c . . . 
            . . . . . . . . . . c c c . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . c c c c c c c c c c c . . . 
            . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
            . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
            . c 1 c c 1 c c 1 1 1 1 1 c . . 
            . c 1 c c 1 c c 1 1 1 1 1 c . . 
            . c 1 c c 1 c c 1 1 1 1 1 c . . 
            . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
            . c 1 1 1 c c 1 1 1 1 1 1 c . . 
            . c 1 1 c c c 1 1 1 1 1 1 c . . 
            . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
            . c c c c c c c c c 1 1 c c . . 
            . . c 1 c 1 c . . c 1 1 c . . . 
            . . c c c c c . . c c 1 c . . . 
            . . . . . . . . . . c c c . . . 
            `],
        500,
        characterAnimations.rule(Predicate.FacingLeft)
        )
        characterAnimations.loopFrames(
        enty,
        [img`
            . . . . . . . . . . . . . . . . 
            . . c c c c c c c c c c c . . . 
            . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
            . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
            . c 1 1 1 1 1 c c 1 c c 1 c . . 
            . c 1 1 1 1 1 c c 1 c c 1 c . . 
            . c 1 1 1 1 1 c c 1 c c 1 c . . 
            . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
            . c 1 1 1 1 1 1 c c 1 1 1 c . . 
            . c 1 1 1 1 1 1 c c c 1 1 c . . 
            . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
            . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
            . c c 1 1 c c c c c c c c c . . 
            . . c 1 1 c . . c 1 c 1 c . . . 
            . . c 1 c c . . c c c c c . . . 
            . . c c c . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . c c c c c c c c c c c . . . 
            . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
            . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
            . c 1 1 1 1 1 c c 1 c c 1 c . . 
            . c 1 1 1 1 1 c c 1 c c 1 c . . 
            . c 1 1 1 1 1 c c 1 c c 1 c . . 
            . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
            . c 1 1 1 1 1 1 c c 1 1 1 c . . 
            . c 1 1 1 1 1 1 c c c 1 1 c . . 
            . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
            . c c 1 1 c c c c c c c c c . . 
            . . c 1 1 c . . c 1 c 1 c . . . 
            . . c 1 c c . . c c c c c . . . 
            . . c c c . . . . . . . . . . . 
            `],
        500,
        characterAnimations.rule(Predicate.FacingRight)
        )
        enty.ay = 200
        sprites.setDataBoolean(enty, "move", false)
        sprites.setDataNumber(enty, "hp", 3)
        sprites.setDataSprite(enty, "hpim", sprites.create(img`
            . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . 
            f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f 
            f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f 
            . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . 
            . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . 
            `, SpriteKind.hp))
        sprites.readDataSprite(enty, "hpim").setFlag(SpriteFlag.Ghost, true)
        sprites.setDataNumber(enty, "type", 3)
        tiles.placeOnTile(enty, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile101`)) {
        enty = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . 2 . . . . . . . . . . . 
            . . c 4 1 2 c c c . . c c . . . 
            . . b 4 4 2 b b b c c b b . . . 
            . . b b 2 b b b b b b b b . . . 
            . . b b b b b c b b b b b . . . 
            . . . . . . b b c . . b b . . . 
            . . . . . . . b b . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Enemy)
        characterAnimations.loopFrames(
        enty,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . 2 . . . . . . . . . . . 
            . . c 4 1 2 c c c . . c c . . . 
            . . b 4 4 2 b b b c c b b . . . 
            . . b b 2 b b b b b b b b . . . 
            . . b b b b b c b b b b b . . . 
            . . . . . . b b c . . b b . . . 
            . . . . . . . b b . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `],
        500,
        characterAnimations.rule(Predicate.FacingLeft)
        )
        characterAnimations.loopFrames(
        enty,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . 2 . . . . 
            . . . c c . . c c c 2 1 4 c . . 
            . . . b b c c b b b 2 4 4 b . . 
            . . . b b b b b b b b 2 b b . . 
            . . . b b b b b c b b b b b . . 
            . . . b b . . c b b . . . . . . 
            . . . . . . . b b . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `],
        500,
        characterAnimations.rule(Predicate.FacingRight)
        )
        enty.ay = 0
        sprites.setDataBoolean(enty, "move", false)
        sprites.setDataNumber(enty, "hp", 5)
        enty.setFlag(SpriteFlag.BounceOnWall, true)
        sprites.setDataSprite(enty, "hpim", sprites.create(img`
            . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . 
            f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f 
            f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f 
            . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . 
            . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . 
            `, SpriteKind.hp))
        sprites.readDataSprite(enty, "hpim").setFlag(SpriteFlag.Ghost, true)
        sprites.setDataNumber(enty, "type", 5)
        if (Math.percentChance(50)) {
            enty.vx = 50
        } else {
            enty.vx = -50
        }
        tiles.placeOnTile(enty, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile88`)) {
        enty = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . c c c c c c c c c c c . . . 
            . c b b b b b b b b b b b c . . 
            . c b c b b b b b b b c b c . . 
            . c b 2 2 b 2 2 b b b b b c . . 
            . c b 2 2 b 2 2 b b b b b c . . 
            . c b 2 2 b 2 2 b b b b b c . . 
            . c b b b b b b b b b b b c . . 
            . c b b b 2 2 b b b b b b c . . 
            . c b b 2 2 2 b b b b b b c . . 
            . c b c b b b b b b b c b c . . 
            . c b b b b b b b b b b b c . . 
            . . c c c c c c c c b b c . . . 
            . . c b c b c . . c b b c . . . 
            . . c c c c c . . c c b c . . . 
            . . . . . . . . . . c c c . . . 
            `, SpriteKind.Enemy)
        characterAnimations.loopFrames(
        enty,
        [img`
            . . . . . . . . . . . . . . . . 
            . . c c c c c c c c c c c . . . 
            . c b b b b b b b b b b b c . . 
            . c b c b b b b b b b c b c . . 
            . c b 2 2 b 2 2 b b b b b c . . 
            . c b 2 2 b 2 2 b b b b b c . . 
            . c b 2 2 b 2 2 b b b b b c . . 
            . c b b b b b b b b b b b c . . 
            . c b b b 2 2 b b b b b b c . . 
            . c b b 2 2 2 b b b b b b c . . 
            . c b c b b b b b b b c b c . . 
            . c b b b b b b b b b b b c . . 
            . . c c c c c c c c b b c . . . 
            . . c b c b c . . c b b c . . . 
            . . c c c c c . . c c b c . . . 
            . . . . . . . . . . c c c . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . c c c c c c c c c c c . . . 
            . c b b b b b b b b b b b c . . 
            . c b c b b b b b b b c b c . . 
            . c b 2 2 b 2 2 b b b b b c . . 
            . c b 2 2 b 2 2 b b b b b c . . 
            . c b 2 2 b 2 2 b b b b b c . . 
            . c b b b b b b b b b b b c . . 
            . c b b b 2 2 b b b b b b c . . 
            . c b b 2 2 2 b b b b b b c . . 
            . c b c b b b b b b b c b c . . 
            . . c c c c c c c c b b c . . . 
            . . c b c b c . . c b b c . . . 
            . . c c c c c . . c c b c . . . 
            . . . . . . . . . . c c c . . . 
            `],
        500,
        characterAnimations.rule(Predicate.FacingLeft)
        )
        characterAnimations.loopFrames(
        enty,
        [img`
            . . . . . . . . . . . . . . . . 
            . . c c c c c c c c c c c . . . 
            . c b b b b b b b b b b b c . . 
            . c b c b b b b b b b c b c . . 
            . c b b b b b 2 2 b 2 2 b c . . 
            . c b b b b b 2 2 b 2 2 b c . . 
            . c b b b b b 2 2 b 2 2 b c . . 
            . c b b b b b b b b b b b c . . 
            . c b b b b b b 2 2 b b b c . . 
            . c b b b b b b 2 2 2 b b c . . 
            . c b c b b b b b b b c b c . . 
            . c b b b b b b b b b b b c . . 
            . . c b b c c c c c c c c . . . 
            . . c b b c . . c b c b c . . . 
            . . c b c c . . c c c c c . . . 
            . . c c c . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . c c c c c c c c c c c . . . 
            . c b b b b b b b b b b b c . . 
            . c b c b b b b b b b c b c . . 
            . c b b b b b 2 2 b 2 2 b c . . 
            . c b b b b b 2 2 b 2 2 b c . . 
            . c b b b b b 2 2 b 2 2 b c . . 
            . c b b b b b b b b b b b c . . 
            . c b b b b b b 2 2 b b b c . . 
            . c b b b b b b 2 2 2 b b c . . 
            . c b c b b b b b b b c b c . . 
            . . c b b c c c c c c c c . . . 
            . . c b b c . . c b c b c . . . 
            . . c b c c . . c c c c c . . . 
            . . c c c . . . . . . . . . . . 
            `],
        500,
        characterAnimations.rule(Predicate.FacingRight)
        )
        enty.ay = 200
        sprites.setDataBoolean(enty, "move", false)
        sprites.setDataNumber(enty, "hp", 5)
        sprites.setDataSprite(enty, "hpim", sprites.create(img`
            . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . 
            f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f 
            f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f 
            . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . 
            . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . 
            `, SpriteKind.hp))
        sprites.readDataSprite(enty, "hpim").setFlag(SpriteFlag.Ghost, true)
        sprites.setDataNumber(enty, "type", 3)
        tiles.placeOnTile(enty, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile74`)) {
        if (levelnublucasM == 3) {
            enty = sprites.create(img`
                ................
                ........4....44.
                .......44..1444.
                ......44111c141.
                .....111cccc11c.
                ....4cc111111c..
                ....476cc11114..
                ....46744cc11...
                ....41111111c...
                ....11cccccc....
                ....cc111111....
                .....11cccc.....
                ......1111......
                ..ccc1111111cc..
                ..111cccc11111..
                ..1111111ccccc..
                ..cccccccccccc..
                ..111111111111..
                ..ccc111111ccc..
                ..111cccccc111..
                ..111111111ccc..
                ..cccccccccccc..
                ..111111ccccc1..
                ..cccccc111111..
                ..11cccccccccc..
                ..11111ccc1111..
                ....111111cc....
                .....11ccc1.....
                .....cc111c.....
                .....11cc11.....
                .....cc11cc.....
                ................
                `, SpriteKind.Enemy)
            animation.runImageAnimation(
            enty,
            [img`
                ................
                ........4....44.
                .......44..1444.
                ......44111c141.
                .....111cccc11c.
                ....4cc111111c..
                ....476cc11114..
                ....46744cc11...
                ....41111111c...
                ....11cccccc....
                ....cc111111....
                .....11cccc.....
                ......1111......
                ..ccc1111111cc..
                ..111cccc11111..
                ..1111111ccccc..
                ..cccccccccccc..
                ..111111111111..
                ..ccc111111ccc..
                ..111cccccc111..
                ..111111111ccc..
                ..cccccccccccc..
                ..111111ccccc1..
                ..cccccc111111..
                ..11cccccccccc..
                ..11111ccc1111..
                ....111111cc....
                .....11ccc1.....
                .....cc111c.....
                .....11cc11.....
                .....cc11cc.....
                ................
                `,img`
                ..........4.....
                ........444.44..
                .......444..144.
                ......44111c141.
                .....111cccc11c.
                ....4cc111111c..
                ....476cc11114..
                ....46744cc11...
                ....41111111c...
                ....11cccccc....
                ....cc111111....
                .....11cccc.....
                ......1111......
                ..ccc1111111cc..
                ..111cccc11111..
                ..1111111ccccc..
                ..cccccccccccc..
                ..111111111111..
                ..ccc111111ccc..
                ..111cccccc111..
                ..111111111ccc..
                ..cccccccccccc..
                ..111111ccccc1..
                ..cccccc111111..
                ..11cccccccccc..
                ..11111ccc1111..
                ....111111cc....
                .....11ccc1.....
                .....cc111c.....
                .....11cc11.....
                .....cc11cc.....
                ................
                `],
            500,
            true
            )
            enty.vy = 50
            sprites.setDataBoolean(enty, "move", false)
            sprites.setDataNumber(enty, "hp", 7)
            sprites.setDataSprite(enty, "hpim", sprites.create(img`
                . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . 
                f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f 
                f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f 
                . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . 
                . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . 
                `, SpriteKind.hp))
            sprites.readDataSprite(enty, "hpim").setFlag(SpriteFlag.Ghost, true)
            enty.setFlag(SpriteFlag.BounceOnWall, true)
            sprites.setDataNumber(enty, "type", 20)
            tiles.placeOnTile(enty, value)
        } else if (levelnublucasM == 4) {
            enty = sprites.create(img`
                ..................
                .....fffffffffff..
                .....f333333333f..
                .....f333333333f..
                .....f333ff3ff3f..
                .....f333ff3ff3f..
                .....f333ff3ff3f..
                .....f333ff3ff3f..
                .....f333333333f..
                .....f3333fff33f..
                .....f33333ff33f..
                ..ffffff333333ff..
                fffbbbc3333333f...
                fbfbbc33333333ff..
                fcfcceee333333ff..
                f3f33ceee33333ff..
                f3f333cceee333ff..
                f3f33333ceeee3ff..
                f3f333333cceeeff..
                f3f33333333cceff..
                fff3333333333cff..
                ..f33333333333ff..
                ..ff33f33f3333f...
                ..ff33ffff33fff...
                ...f33f..f33f.....
                ...ffff..ffff.....
                `, SpriteKind.Enemy)
            characterAnimations.loopFrames(
            enty,
            [img`
                ..............................
                ..............................
                ..............................
                ..............................
                ..............................
                ..fffffffffffffffffffff.......
                ..f44444444444444444444f......
                ..f44444444444444444444f......
                ..f444444444444444444ff.......
                ..f44ffff444444444444f........
                ..f4f9988f444444444fff........
                ..f4f9888f444444444fff........
                ..f4f8888f4444444ffeef........
                ..f4f8888f4444444ffeeff.......
                ..f44ffff444444ffeeff44f......
                ..f444444444444ffeeff44ff.....
                ...ffffff4444ffffff444444f....
                ..fff4444ffff......ff4444ff...
                ..fff4444f.........ff4444ff...
                ..fff4444f...........ff4444f..
                ..fff4444f...........ff4444ff.
                ..fff4444f.............ff44ff.
                ..fff4444f.............ff44ff.
                ...ffff44f...............ff...
                .....ff44f...............ff...
                ......ffff....................
                `,img`
                ..............................
                ..............................
                ..............................
                ..............................
                ..............................
                ..............................
                .....fffffffffffffffffffff....
                .....f44444444444444444444f...
                .....f44444444444444444444f...
                .....f444444444444444444ff....
                .....f44ffff444444444444f.....
                .....f4f9988f444444444fff.....
                .....f4f9888f444444444fff.....
                .....f4f8888f4444444ffeef.....
                .....f4f8888f4444444feeff.....
                .....ff4ffff444444ffeffff.....
                .....ff44444444444ffeffff.....
                ...ffeeff44444ffff..f4444ff...
                ...ffeeff44444ffff..f4444ff...
                .ffeeff..fffff4444ff.ff44ff...
                .ffeeff..fffff4444ff.ff44ff...
                feeeeff..feeff4444ff.ff44ff...
                feeeeff..feeff4444ff.ff44ff...
                feeff....feeff4444ff.ff44ff...
                feeff....feeff4444ff.ff44ff...
                feeff....fffeeff44ff.ff44ff...
                `,img`
                ..............................
                ..............................
                ..............................
                ..............................
                ..............................
                fffffffffffffffffffff.........
                f44444444444444444444f........
                f44444444444444444444f........
                f444444444444444444ff.........
                f44ffff444444444444f..........
                f4f9988f444444444fff..........
                f4f9888f444444444fff..........
                f4f8888f4444444ffeef..........
                f4f8888f444444ffeeff..........
                f44ffff4444444ffeeff..........
                f44fffffff44ffeefffff.........
                f44fffffff44ffeefffff.........
                .ffffff44fff....ff444ff.......
                .ffffff44fff....ff444ff.......
                feeff4444feeff....ff444ff.....
                feeff4444feeff....ff444ff.....
                feeff4444feeff......f4444ff...
                feeff4444feeff......f4444ff...
                feeeeff44fffeeff.....ff4444ff.
                feeeeff44fffeeff.....ff4444ff.
                fffffffff...ffff.......ff4444f
                `],
            100,
            characterAnimations.rule(Predicate.MovingLeft, Predicate.HittingWallDown)
            )
            characterAnimations.loopFrames(
            enty,
            [img`
                ..............................
                ..............................
                ..............................
                ..............................
                ..............................
                .......fffffffffffffffffffff..
                ......f44444444444444444444f..
                ......f44444444444444444444f..
                .......ff444444444444444444f..
                ........f444444444444ffff44f..
                ........fff444444444f8899f4f..
                ........fff444444444f8889f4f..
                ........feeff4444444f8888f4f..
                .......ffeeff4444444f8888f4f..
                ......f44ffeeff444444ffff44f..
                .....ff44ffeeff444444444444f..
                ....f444444ffffff4444ffffff...
                ...ff4444ff......ffff4444fff..
                ...ff4444ff.........f4444fff..
                ..f4444ff...........f4444fff..
                .ff4444ff...........f4444fff..
                .ff44ff.............f4444fff..
                .ff44ff.............f4444fff..
                ...ff...............f44ffff...
                ...ff...............f44ff.....
                ....................ffff......
                `,img`
                ..............................
                ..............................
                ..............................
                ..............................
                ..............................
                ..............................
                ....fffffffffffffffffffff.....
                ...f44444444444444444444f.....
                ...f44444444444444444444f.....
                ....ff444444444444444444f.....
                .....f444444444444ffff44f.....
                .....fff444444444f8899f4f.....
                .....fff444444444f8889f4f.....
                .....feeff4444444f8888f4f.....
                .....ffeef4444444f8888f4f.....
                .....ffffeff444444ffff4ff.....
                .....ffffeff44444444444ff.....
                ...ff4444f..ffff44444ffeeff...
                ...ff4444f..ffff44444ffeeff...
                ...ff44ff.ff4444fffff..ffeeff.
                ...ff44ff.ff4444fffff..ffeeff.
                ...ff44ff.ff4444ffeef..ffeeeef
                ...ff44ff.ff4444ffeef..ffeeeef
                ...ff44ff.ff4444ffeef....ffeef
                ...ff44ff.ff4444ffeef....ffeef
                ...ff44ff.ff44ffeefff....ffeef
                `,img`
                ..............................
                ..............................
                ..............................
                ..............................
                ..............................
                .........fffffffffffffffffffff
                ........f44444444444444444444f
                ........f44444444444444444444f
                .........ff444444444444444444f
                ..........f444444444444ffff44f
                ..........fff444444444f8899f4f
                ..........fff444444444f8889f4f
                ..........feeff4444444f8888f4f
                ..........ffeeff444444f8888f4f
                ..........ffeeff4444444ffff44f
                .........fffffeeff44fffffff44f
                .........fffffeeff44fffffff44f
                .......ff444ff....fff44ffffff.
                .......ff444ff....fff44ffffff.
                .....ff444ff....ffeef4444ffeef
                .....ff444ff....ffeef4444ffeef
                ...ff4444f......ffeef4444ffeef
                ...ff4444f......ffeef4444ffeef
                .ff4444ff.....ffeefff44ffeeeef
                .ff4444ff.....ffeefff44ffeeeef
                f4444ff.......ffff...fffffffff
                `],
            100,
            characterAnimations.rule(Predicate.MovingRight, Predicate.HittingWallDown)
            )
            if (Math.percentChance(50)) {
                enty.vx = 50
            } else {
                enty.vx = -50
            }
            enty.ay = 200
            sprites.setDataBoolean(enty, "move", false)
            sprites.setDataNumber(enty, "hp", 20)
            sprites.setDataSprite(enty, "hpim", sprites.create(img`
                . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . 
                f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f 
                f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f 
                . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . 
                . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . 
                `, SpriteKind.hp))
            sprites.readDataSprite(enty, "hpim").setFlag(SpriteFlag.Ghost, true)
            sprites.readDataSprite(enty, "hpim").setFlag(SpriteFlag.Invisible, true)
            sprites.setDataNumber(enty, "type", 4)
            tiles.placeOnTile(enty, value)
        } else if (levelnublucasM == 7) {
            enty = sprites.create(img`
                ..................
                .ffffffffff.......
                .fccccccccf.......
                .fcffcffccf.......
                .fcffcffccf.......
                .fcffeffecf.......
                .feffeffeef.......
                .feeeeeeeef....fff
                .feeeeeeeef...ffbf
                .feeeeeeeef.fffbbf
                .fffffffffffeebbbf
                ..fcccccccfeeebbdf
                ..fccfcccfeffbbddf
                ..fccccffeffffffff
                ..f22ffeef2f......
                ..f22feff22f......
                ..fffef2222f......
                ..feef22222f......
                .ffff222222f......
                .ff22222222f......
                .ff22222222f......
                ..f22222222f......
                ..f22222222f......
                ..ffffffffff......
                ..fff..fff........
                ..fff..fff........
                `, SpriteKind.Enemy)
            enty.ay = 200
            sprites.setDataBoolean(enty, "move", false)
            sprites.setDataNumber(enty, "hp", 20)
            sprites.setDataSprite(enty, "hpim", sprites.create(img`
                . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . 
                f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f 
                f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f 
                . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . 
                . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . 
                `, SpriteKind.hp))
            sprites.readDataSprite(enty, "hpim").setFlag(SpriteFlag.Ghost, true)
            sprites.readDataSprite(enty, "hpim").setFlag(SpriteFlag.Invisible, true)
            sprites.setDataNumber(enty, "type", 21)
            tiles.placeOnTile(enty, value)
        } else if (levelnublucasM == 10) {
            enty = sprites.create(img`
                ..................
                ..................
                ..................
                ..................
                ..................
                ....cc.c..........
                ....ccccccc.......
                .....ccccccc......
                ......fccccc......
                ......ff1fcc......
                ......ff1f1f......
                ......f1111f......
                .......fffff......
                ....bbbbcceee.....
                ....cbbbcffeee....
                ....ccbbbffeee....
                ....ccfffffeee....
                ....1cfffffeee....
                ....11fffff1ee....
                ......fffffcee....
                ......cc.cc.ce....
                ......cc.bb.......
                ......bc.cc.......
                ......cb.cc.......
                ......cc.cc.......
                ......bb.bb.......
                `, SpriteKind.Enemy)
            sprites.setDataBoolean(enty, "move", false)
            sprites.setDataNumber(enty, "hp", 30)
            sprites.setDataSprite(enty, "hpim", sprites.create(img`
                . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . 
                f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f 
                f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f 
                . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . 
                . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . 
                `, SpriteKind.hp))
            sprites.readDataSprite(enty, "hpim").setFlag(SpriteFlag.Ghost, true)
            sprites.readDataSprite(enty, "hpim").setFlag(SpriteFlag.Invisible, true)
            sprites.setDataNumber(enty, "type", 22)
            tiles.placeOnTile(enty, value)
        } else if (levelnublucasM == 14) {
            enty = sprites.create(img`
                ..................
                .....fffffffffff..
                .....f333333333f..
                .....f333333333f..
                .....f333ff3ff3f..
                .....f333ff3ff3f..
                .....f333ff3ff3f..
                .....f333ff3ff3f..
                .....f333333333f..
                .....f3333fff33f..
                .....f33333ff33f..
                ..ffffff333333ff..
                fffbbbc3333333f...
                fbfbbc33333333ff..
                fcfcceee333333ff..
                f3f33ceee33333ff..
                f3f333cceee333ff..
                f3f33333ceeee3ff..
                f3f333333cceeeff..
                f3f33333333cceff..
                fff3333333333cff..
                ..f33333333333ff..
                ..ff33f33f3333f...
                ..ff33ffff33fff...
                ...f33f..f33f.....
                ...ffff..ffff.....
                `, SpriteKind.Enemy)
            characterAnimations.loopFrames(
            enty,
            [img`
                ..............................
                ..............................
                ..............................
                ..............................
                ..........ccccccccc...........
                .....c....c3333333c...........
                ....cccc..c3c333c3c...........
                ....c3ccc.c3cc3cc3c...........
                ....c333c.c3333333c...ccc.....
                ....c333c.c3333333c..cc3c.....
                ....c333c.ca333333c.cc33c.....
                ....c333c.caa33333c.c333c.....
                ....c333c.caaa3333c.c333c.....
                ....c333c.c3aa3333c.c333c.....
                ....c333c.c33aa333c.c333c.....
                ....c333c.c33aaa33c.c333c.....
                ....c333c.c333aaa3c.c333c.....
                ....c333c.caaaaaaac.c333c.....
                ....c333c.caaaaaaac.c333c.....
                ....ca33c.ccccccccc.c333c.....
                ....caaac...........c333c.....
                ....caaac...........c333c.....
                ....ccccc..ccc.ccc..caa3c.....
                ...........c3c.c3c..caaac.....
                ...........c3c.c3c..caaac.....
                ...........ccc.ccc..ccccc.....
                `,img`
                ..............................
                ..............................
                ..............................
                .........ccccccccc............
                .........c3333333c............
                .....c...c3c333c3c....ccc.....
                ....cccc.c3cc3cc3c...cc3c.....
                ....c3cccc3333333c..cc33c.....
                ....c333cc3333333c..c333c.....
                ....c333cca333333c..c333c.....
                ....c333ccaa33333c..c333c.....
                ....c333ccaaa3333c..c333c.....
                ....c333cc3aa3333c..c333c.....
                ....c333cc33aa333c..c333c.....
                ....c333cc33aaa33c..c333c.....
                ....c333cc333aaa3c..c333c.....
                ....c333ccaaaaaaac..c333c.....
                ....c333ccaaaaaaac..c333c.....
                ....c333cccccccccc..ca33c.....
                ....c3aac...........caa3c.....
                ....caaac.....ccc...caaac.....
                ....caaac.....c3c...caaac.....
                ....ccccc.ccc.c3c...ccccc.....
                ..........c3c.ccc.............
                ..........c3c.................
                ..........ccc.................
                `,img`
                ..............................
                ..............................
                ..............................
                ..........ccccccccc...........
                ..........c3333333c...ccc.....
                ..........c3c333c3c..cc3c.....
                ..........c3cc3cc3c.cc33c.....
                ..........c3333333c.c333c.....
                .....c....c3333333c.c333c.....
                ....cccc..ca333333c.c333c.....
                ....c3ccc.caa33333c.c333c.....
                ....c333c.caaa3333c.c333c.....
                ....c333c.c3aa3333c.c333c.....
                ....c333c.c33aa333c.c333c.....
                ....c333c.c33aaa33c.c333c.....
                ....c333c.c333aaa3c.c333c.....
                ....c333c.caaaaaaac.c333c.....
                ....c333c.caaaaaaac.c333c.....
                ....c333c.ccccccccc.caa3c.....
                ....c333c...........caaac.....
                ....c333c...........caaac.....
                ....c333c.....ccc...ccccc.....
                ....c3a3c....cc3c.............
                ....c3aac....cc3c.............
                ....caaac....cccc.............
                ....ccccc....ccc..............
                `,img`
                ..............................
                ..............................
                ..............................
                ..........ccccccccc...........
                .....c....c3333333c...........
                ....cccc..c3c333c3c...........
                ....c3ccc.c3cc3cc3c...ccc.....
                ....c333c.c3333333c..cc3c.....
                ....c333c.c3333333c.cc33c.....
                ....c333c.ca333333c.c333c.....
                ....c333c.caa33333c.c333c.....
                ....c333c.caaa3333c.c333c.....
                ....c333c.c3aa3333c.c333c.....
                ....c333c.c33aa333c.c333c.....
                ....c333c.c33aaa33c.c333c.....
                ....c333c.c333aaa3c.c333c.....
                ....c333c.caaaaaaac.c333c.....
                ....c333c.caaaaaaac.c333c.....
                ....c333c.ccccccccc.c333c.....
                ....caa3c...........c333c.....
                ....caaac...........c333c.....
                ....ccccc...ccc.....c333c.....
                ............c3cc....c333c.....
                ............c3cc....ccccc.....
                ............cccc..............
                .............ccc..............
                `],
            100,
            characterAnimations.rule(Predicate.FacingLeft)
            )
            characterAnimations.loopFrames(
            enty,
            [img`
                ..............................
                ..............................
                ..............................
                ..............................
                ...........ccccccccc..........
                ...........c3333333c....c.....
                ...........c3c333c3c..cccc....
                ...........c3cc3cc3c.ccc3c....
                .....ccc...c3333333c.c333c....
                .....c3cc..c3333333c.c333c....
                .....c33cc.c333333ac.c333c....
                .....c333c.c33333aac.c333c....
                .....c333c.c3333aaac.c333c....
                .....c333c.c3333aa3c.c333c....
                .....c333c.c333aa33c.c333c....
                .....c333c.c33aaa33c.c333c....
                .....c333c.c3aaa333c.c333c....
                .....c333c.caaaaaaac.c333c....
                .....c333c.caaaaaaac.c333c....
                .....c333c.ccccccccc.c33ac....
                .....c333c...........caaac....
                .....c333c...........caaac....
                .....c3aac..ccc.ccc..ccccc....
                .....caaac..c3c.c3c...........
                .....caaac..c3c.c3c...........
                .....ccccc..ccc.ccc...........
                `,img`
                ..............................
                ..............................
                ..............................
                ............ccccccccc.........
                ............c3333333c.........
                .....ccc....c3c333c3c...c.....
                .....c3cc...c3cc3cc3c.cccc....
                .....c33cc..c3333333cccc3c....
                .....c333c..c3333333cc333c....
                .....c333c..c333333acc333c....
                .....c333c..c33333aacc333c....
                .....c333c..c3333aaacc333c....
                .....c333c..c3333aa3cc333c....
                .....c333c..c333aa33cc333c....
                .....c333c..c33aaa33cc333c....
                .....c333c..c3aaa333cc333c....
                .....c333c..caaaaaaacc333c....
                .....c333c..caaaaaaacc333c....
                .....c33ac..cccccccccc333c....
                .....c3aac...........caa3c....
                .....caaac...ccc.....caaac....
                .....caaac...c3c.....caaac....
                .....ccccc...c3c.ccc.ccccc....
                .............ccc.c3c..........
                .................c3c..........
                .................ccc..........
                `,img`
                ..............................
                ..............................
                ..............................
                ...........ccccccccc..........
                .....ccc...c3333333c..........
                .....c3cc..c3c333c3c..........
                .....c33cc.c3cc3cc3c..........
                .....c333c.c3333333c..........
                .....c333c.c3333333c....c.....
                .....c333c.c333333ac..cccc....
                .....c333c.c33333aac.ccc3c....
                .....c333c.c3333aaac.c333c....
                .....c333c.c3333aa3c.c333c....
                .....c333c.c333aa33c.c333c....
                .....c333c.c33aaa33c.c333c....
                .....c333c.c3aaa333c.c333c....
                .....c333c.caaaaaaac.c333c....
                .....c333c.caaaaaaac.c333c....
                .....c3aac.ccccccccc.c333c....
                .....caaac...........c333c....
                .....caaac...........c333c....
                .....ccccc...ccc.....c333c....
                .............c3cc....c3a3c....
                .............c3cc....caa3c....
                .............cccc....caaac....
                ..............ccc....ccccc....
                `,img`
                ..............................
                ..............................
                ..............................
                ...........ccccccccc..........
                ...........c3333333c....c.....
                ...........c3c333c3c..cccc....
                .....ccc...c3cc3cc3c.ccc3c....
                .....c3cc..c3333333c.c333c....
                .....c33cc.c3333333c.c333c....
                .....c333c.c333333ac.c333c....
                .....c333c.c33333aac.c333c....
                .....c333c.c3333aaac.c333c....
                .....c333c.c3333aa3c.c333c....
                .....c333c.c333aa33c.c333c....
                .....c333c.c33aaa33c.c333c....
                .....c333c.c3aaa333c.c333c....
                .....c333c.caaaaaaac.c333c....
                .....c333c.caaaaaaac.c333c....
                .....c333c.ccccccccc.c333c....
                .....c333c...........c3aac....
                .....c333c...........caaac....
                .....c333c.....ccc...ccccc....
                .....c333c....cc3c............
                .....ccccc....cc3c............
                ..............cccc............
                ..............ccc.............
                `],
            100,
            characterAnimations.rule(Predicate.MovingRight)
            )
            if (Math.percentChance(50)) {
                enty.vx = 50
            } else {
                enty.vx = -50
            }
            enty.ay = 200
            sprites.setDataBoolean(enty, "move", false)
            sprites.setDataNumber(enty, "hp", 20)
            sprites.setDataSprite(enty, "hpim", sprites.create(img`
                . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . 
                f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f 
                f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f 
                . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . 
                . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . 
                `, SpriteKind.hp))
            sprites.readDataSprite(enty, "hpim").setFlag(SpriteFlag.Ghost, true)
            sprites.readDataSprite(enty, "hpim").setFlag(SpriteFlag.Invisible, true)
            sprites.setDataNumber(enty, "type", 4)
            tiles.placeOnTile(enty, value)
        } else if (levelnublucasM == 19) {
            enty = sprites.create(img`
                .............cc...
                ............cbc...
                ....767.cc66b6c...
                ....667ccb66b6....
                ....6cccc666c66...
                ...c7c22c6b6226...
                ...cbc22c6b6226...
                ...cbccc66b66c6...
                ...cbbbb6bbb6b6...
                ...ccccc6bbb6b6...
                .....cbb6ccc6c6...
                .....cb6bc..6c6...
                ..cc.666bbcc6c6...
                ..cbc6bbbbcc6c....
                ..cbccbbbbc66c....
                ..cbccbbbbc66c....
                ..cbcccbbcc66c....
                ..cbcccccc.66c....
                ..ccccc.cc.c66....
                .....6c.cb..cc....
                ...6.66.cb........
                ..66666.cbb.......
                ..6.6cc.ccc.......
                .ccccccccccccc....
                ..4224.42224......
                ...44...444.......
                `, SpriteKind.Enemy)
            characterAnimations.loopFrames(
            enty,
            [img`
                ...................cc.........
                ..................cbc.........
                ..........765.cc66b6c.........
                ..........667ccb66b6..........
                ..........5cccc666c66.........
                .........c7c22c6b6226.........
                .........cbc22c6b6226.........
                .........cbccc66b66c6.........
                .........cbbbb6bbb6b6.........
                .........ccccc6bbb6b6.........
                ...........cbb6ccc6c6.........
                ...........cb6bc..6c6.........
                ........cc.666bbcc6c6.........
                ........cbc6bbbbcc6c..........
                ........cbccbbbbc66c..........
                ........cbccbbbbc66c..........
                ........cbcccbbcc66c..........
                ........cbcccccc.66c..........
                ........ccccc.cc.c66..........
                ...........6c.cb..cc..........
                .........6.66.cb..............
                ........66666.cbb.............
                ........6.6cc.ccc.............
                .......ccccccccccccc..........
                ........4224.42224............
                .........44...444.............
                `,img`
                ...................cc.........
                ..................cbc.........
                ..........767.cc66b6c.........
                ..........667ccb66b6..........
                ..........6cccc666c66.........
                .........c7c22c6b6226.........
                .........cbc22c6b6226.........
                .........cbccc66b66c6.........
                .........cbbbb6bbb6b6.........
                .........ccccc6bbb6b6.........
                ...........cbb6ccc6c6.........
                ........cc.cb6bc..6c6.........
                ........cbc666bbcc6c6.........
                ........cbc6bbbbcc6c..........
                ........cbccbbbbc66c..........
                ........cbccbbbbc66c..........
                ........cbcccbbcc66c..........
                ........cccccccc.c66..........
                ...........cc.cc..cc..........
                ...........6c.cb..............
                .........6.66.cb..............
                ........66666.cbb.............
                ........6.6cc.ccc.............
                .......ccccccccccccc..........
                ........4224.42224............
                .........44...444.............
                `,img`
                ...................cc.........
                ..................cbc.........
                ..........545.cc66b6c.........
                ..........445ccb66b6..........
                ..........4cccc666c66.........
                .........c5c22c6b6226.........
                .........cbc22c6b6226.........
                .........cbccc66b66c6.........
                .........cbbbb6bbb6b6.........
                .........ccccc6bbb6b6.........
                ........cc.cbb6ccc6c6.........
                ........cbccb6bc.c6c6.........
                ........cbc666bbcc6c6.........
                ........cbc6bbbbc66c..........
                ........cbccbbbbc66c..........
                ........cbccbbbbc66c..........
                ........cccccbbccc66..........
                ...........ccccc..6c..........
                ...........cc.cc..............
                ...........6c.cb..............
                .........6.66.cb..............
                ........66666.cbb.............
                ........6.6cc.ccc.............
                .......ccccccccccccc..........
                ........4224.42224............
                .........44...444.............
                `,img`
                ..............................
                ..............................
                ..................cccc........
                ..........757.cc66b6bc........
                ..........557ccb66b6cc........
                ..........5cccc666c66.........
                .........c7c22c6b6226.........
                .........cbc22c6b6226.........
                .........cbccc66b66c6.........
                .........cbbbb6bbb6b6.........
                .........ccccc6bbb6b6.........
                ...........cbb6ccc6c6.........
                ........cc.cb6bc..6c6.........
                ........cbc666bbcc6c6.........
                ........cbc6bbbbcc6c..........
                ........cbccbbbbc66c..........
                ........cbccbbbbc66c..........
                ........cbcccbbcc66c..........
                ........cccccccc.c66..........
                ...........cc.cc..cc..........
                ...........6c.cb..............
                ........66666.cbb.............
                ........6.6cc.ccc.............
                .......ccccccccccccc..........
                ........4224.42224............
                .........44...444.............
                `],
            300,
            characterAnimations.rule(Predicate.FacingRight)
            )
            characterAnimations.loopFrames(
            enty,
            [img`
                .........cc...................
                .........cbc..................
                .........c6b66cc.567..........
                ..........6b66bcc766..........
                .........66c666cccc5..........
                .........6226b6c22c7c.........
                .........6226b6c22cbc.........
                .........6c66b66cccbc.........
                .........6b6bbb6bbbbc.........
                .........6b6bbb6ccccc.........
                .........6c6ccc6bbc...........
                .........6c6..cb6bc...........
                .........6c6ccbb666.cc........
                ..........c6ccbbbb6cbc........
                ..........c66cbbbbccbc........
                ..........c66cbbbbccbc........
                ..........c66ccbbcccbc........
                ..........c66.ccccccbc........
                ..........66c.cc.ccccc........
                ..........cc..bc.c6...........
                ..............bc.66.6.........
                .............bbc.66666........
                .............ccc.cc6.6........
                ..........ccccccccccccc.......
                ............42224.4224........
                .............444...44.........
                `,img`
                .........cc...................
                .........cbc..................
                .........c6b66cc.767..........
                ..........6b66bcc766..........
                .........66c666cccc6..........
                .........6226b6c22c7c.........
                .........6226b6c22cbc.........
                .........6c66b66cccbc.........
                .........6b6bbb6bbbbc.........
                .........6b6bbb6ccccc.........
                .........6c6ccc6bbc...........
                .........6c6..cb6bc.cc........
                .........6c6ccbb666cbc........
                ..........c6ccbbbb6cbc........
                ..........c66cbbbbccbc........
                ..........c66cbbbbccbc........
                ..........c66ccbbcccbc........
                ..........66c.cccccccc........
                ..........cc..cc.cc...........
                ..............bc.c6...........
                ..............bc.66.6.........
                .............bbc.66666........
                .............ccc.cc6.6........
                ..........ccccccccccccc.......
                ............42224.4224........
                .............444...44.........
                `,img`
                .........cc...................
                .........cbc..................
                .........c6b66cc.545..........
                ..........6b66bcc544..........
                .........66c666cccc4..........
                .........6226b6c22c5c.........
                .........6226b6c22cbc.........
                .........6c66b66cccbc.........
                .........6b6bbb6bbbbc.........
                .........6b6bbb6ccccc.........
                .........6c6ccc6bbc.cc........
                .........6c6c.cb6bccbc........
                .........6c6ccbb666cbc........
                ..........c66cbbbb6cbc........
                ..........c66cbbbbccbc........
                ..........c66cbbbbccbc........
                ..........66cccbbccccc........
                ..........c6..ccccc...........
                ..............cc.cc...........
                ..............bc.c6...........
                ..............bc.66.6.........
                .............bbc.66666........
                .............ccc.cc6.6........
                ..........ccccccccccccc.......
                ............42224.4224........
                .............444...44.........
                `,img`
                ..............................
                ..............................
                ........cccc..................
                ........cb6b66cc.757..........
                ........cc6b66bcc755..........
                .........66c666cccc5..........
                .........6226b6c22c7c.........
                .........6226b6c22cbc.........
                .........6c66b66cccbc.........
                .........6b6bbb6bbbbc.........
                .........6b6bbb6ccccc.........
                .........6c6ccc6bbc...........
                .........6c6..cb6bc.cc........
                .........6c6ccbb666cbc........
                ..........c6ccbbbb6cbc........
                ..........c66cbbbbccbc........
                ..........c66cbbbbccbc........
                ..........c66ccbbcccbc........
                ..........66c.cccccccc........
                ..........cc..cc.cc...........
                ..............bc.c6...........
                .............bbc.66666........
                .............ccc.cc6.6........
                ..........ccccccccccccc.......
                ............42224.4224........
                .............444...44.........
                `],
            300,
            characterAnimations.rule(Predicate.FacingLeft)
            )
            sprites.setDataBoolean(enty, "move", false)
            sprites.setDataNumber(enty, "hp", 35)
            sprites.setDataSprite(enty, "hpim", sprites.create(img`
                . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . 
                f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f 
                f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f 
                . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . 
                . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . 
                `, SpriteKind.hp))
            sprites.readDataSprite(enty, "hpim").setFlag(SpriteFlag.Ghost, true)
            sprites.readDataSprite(enty, "hpim").setFlag(SpriteFlag.Invisible, true)
            sprites.setDataNumber(enty, "type", 30)
            tiles.placeOnTile(enty, value)
        }
    }
    covertiles()
}
controller.anyButton.onEvent(ControllerButtonEvent.Pressed, function () {
    if (intro) {
        intro = false
        levels()
    } else {
        story.clearAllText()
    }
})
controller.player1.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    if (levelslacker) {
        for (let value of spriteutils.getSpritesWithin(SpriteKind.levelpice, 10, Picker)) {
            if (sprites.readDataBoolean(value, "playable")) {
                playlevel(1, value)
            }
        }
    }
    if (!(spriteutils.isDestroyed(Player_1))) {
        if (game_on) {
            if (Player_1.isHittingTile(CollisionDirection.Bottom)) {
                Player_1.vy = -150
            } else if (sprites.readDataBoolean(Player_1, "D")) {
                Player_1.vy = -150
                sprites.setDataBoolean(Player_1, "D", false)
            }
        }
    }
})
controller.player2.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Pressed, function () {
    if (game_on && p2) {
        controller.player2.moveSprite(Player_2, 100, 0)
        sprites.setDataBoolean(Player_2, "right", true)
        sprites.setDataBoolean(Player_2, "left", false)
    }
})
function windmovething (mySprite: Sprite) {
    for (let value of spriteutils.getSpritesWithin(SpriteKind.Kwind, 16, mySprite)) {
        mySprite.vy = value.vy
        mySprite.vx = value.vx
    }
}
controller.player1.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function () {
    if (!(spriteutils.isDestroyed(Player_1))) {
        if (game_on) {
            shoot(Player_1)
        }
    }
})
function zoomcodeunused () {
    zoom2 = true
    zoom += 1
    timer.after(5009, function () {
        scene.cameraFollowSprite(Player_1)
    })
    zoom2 = false
    zoom = 1
}
controller.player1.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Pressed, function () {
    if (!(spriteutils.isDestroyed(Player_1))) {
        if (game_on) {
            sprites.setDataBoolean(Player_1, "left", true)
            sprites.setDataBoolean(Player_1, "right", false)
        }
    }
})
function endlevel () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Bakeground)
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    sprites.destroyAllSpritesOfKind(SpriteKind.NPC)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.StatusBar)
    sprites.destroyAllSpritesOfKind(SpriteKind.hp)
    sprites.destroyAllSpritesOfKind(SpriteKind.Food)
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
    sprites.destroyAllSpritesOfKind(SpriteKind.NPCTalk)
    tiles.setCurrentTilemap(tilemap`level10`)
    blockSettings.writeNumber("checkpoint", 9999999)
    if (blockSettings.readNumber("Levels") == levelnublucasM) {
        blockSettings.writeNumber("Levels", 1 + levelnublucasM)
    }
    levels()
}
function playlevel (num: number, mySprite: Sprite) {
    levelslacker = false
    sprites.destroyAllSpritesOfKind(SpriteKind.levelpice)
    sprites.destroyAllSpritesOfKind(SpriteKind.Bakeground)
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    if (sprites.readDataNumber(mySprite, "setlwvel") == 0) {
        story.printCharacterText("Player 1")
        story.showPlayerChoices("Coco", "Sam", "Captain Cat")
        if (story.checkLastAnswer("Coco")) {
            blockSettings.writeString("Player1", "Coco")
        }
        if (story.checkLastAnswer("Sam")) {
            blockSettings.writeString("Player1", "Sam")
        }
        if (story.checkLastAnswer("Captain Cat")) {
            blockSettings.writeString("Player1", "Captain Cat")
        }
        story.printCharacterText("Player 2")
        if (blockSettings.readString("Player1") == "Coco") {
            story.showPlayerChoices("Sam", "Captain Cat", "solo")
        }
        if (blockSettings.readString("Player1") == "Sam") {
            story.showPlayerChoices("Coco", "Captain Cat", "solo")
        }
        if (blockSettings.readString("Player1") == "Captain Cat") {
            story.showPlayerChoices("Coco", "Sam", "solo")
        }
        if (story.checkLastAnswer("Coco")) {
            blockSettings.writeString("Player2", "Coco")
        }
        if (story.checkLastAnswer("Sam")) {
            blockSettings.writeString("Player2", "Sam")
        }
        if (story.checkLastAnswer("solo")) {
            blockSettings.writeString("Player2", "solo")
            blockSettings.writeString("Player3", "whatever")
        }
        if (story.checkLastAnswer("Captain Cat")) {
            blockSettings.writeString("Player2", "Captain Cat")
        }
        if (blockSettings.readString("Player1") == "Sam" && blockSettings.readString("Player2") == "Captain Cat" || blockSettings.readString("Player2") == "Sam" && blockSettings.readString("Player1") == "Captain Cat") {
            blockSettings.writeString("Player3", "Coco")
        }
        if (blockSettings.readString("Player1") == "Coco" && blockSettings.readString("Player2") == "Captain Cat" || blockSettings.readString("Player2") == "Coco" && blockSettings.readString("Player1") == "Captain Cat") {
            blockSettings.writeString("Player3", "Sam")
        }
        if (blockSettings.readString("Player1") == "Coco" && blockSettings.readString("Player2") == "Sam" || blockSettings.readString("Player2") == "Coco" && blockSettings.readString("Player1") == "Sam") {
            blockSettings.writeString("Player3", "Captain Cat")
        }
    }
    if (sprites.readDataNumber(mySprite, "setlwvel") == 0) {
        tiles.setCurrentTilemap(tilemap`level7`)
        scene.setBackgroundImage(img`
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999111111111111111999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999111111111111111999999999999999999999999999999999
            9999999999111111111111111111119999999999999999999999999999999999999999999999999999999999999999999999999999999999111111111111111999999999999999999999999999999999
            9999999999111111111111111111119999999999999999999999999999999999999999999999999999999999999999999999999999999999111111111111111999999999999999999999999999999999
            9999999999111111111111111111119999999999999999999999999999999999999999999999999999999999999999999999999999999999111111111111111999999999999999999999999999999999
            9999999999111111111111111111119999999999999999999999999999999999999999999999999999999999999999999999999999999911111111111111111111999999999999999999999999999999
            9999999999111111111111111111119999999999999999999999999999999999999999999999999999999999999999999999999999999911111111111111111111999999999999999999999999999999
            9999999911111111111111111111111199999999999999999999999999999999999999999999999999999999999999999999999999999911111111111111111111999999999999999999999999999999
            9999999911111111111111111111111199999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999911111111111111111111111199999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999555555555555999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999555555555555555555555555999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999955555555555555555555555555555599999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999955555555555555555555555555555555559999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999955555555555555555555555555555555555559999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999555555555555555555555555555555554444449999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999955555555555555555555555555555555544444499999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999555555555555555555555555555555554444499999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999995555555555555555555555555555555544444999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999955555555555555555555555555555555544449999999999999999999999999999999999999999999999999999999966699999999999999999999999999999999999999999999999
            9999999999999999555555555555555555555555555555555544499999999999999999999999999999999999999999999999999999999966699999999999999999999999999999999999999999999999
            9999999999999555555555555555555555555555555555555544499999999999991111111111111199999999999999999999999999999966699999999999999999999999999999999999999999999999
            9999999999995555555555555555555555555555555555555444499999999999991111111111111199999999999999999999999999666966699999999999999999999999999999999999999999999999
            9999999999955555555555555555555555555555555555555444999999999999991111111111111199999999999999999999999999666966699999999999999999999999999999999999999999999999
            9999999999555555555555555555555555555555555555555444999999999999111111111111111111999999999999999999999999666966699999999999999666999999999999999999999999999999
            9999999995555555555555555555555555555555555555555444999999999999111111111111111111999999999999999999999999666666699999999999999666999999999999999999999999999999
            9999999955555555555555555555555555555555555555555444999999999999111111111111111111999999999999999999999999666666699999999999999666999999999999999999999999999999
            9999999555555555555555555555555555555555555555555444999999999999999999999999999999999999999999999999999999666666699999999999999666999999999999999999999999999999
            9999995555555555555555555555555555555555555555555544999999999999999999999999999999999999999999999999999999999966699999999996669666999999999999999999999999999999
            9999955555555555555555555555555555555555555555555544499999999999999999999999999999999999999999999999999999999966699999999996669666999999999999999999999999999999
            9999555555555555555555555555555555555555555555555554499999999999999999999999999999999999999999999999999999999966699999999996669666999999999999999999999999999999
            9995555555555555555555555555555555555555555555555555449999999999999999999999999999999999999999999955555555555566655555555556666666999999999999999999999999999999
            9555555555555555555555555555555555555555555555555555549999999999999999999999999999999999999995555555555555555566655555555556666666599999999999999999999999999999
            5555555555555555555555555555555555555555555555555555554999999999999999999999999999999999955555555555555555555566655555555556666666555999999999999999999999999999
            5555555555555555555555555555555555555555555555555555555599999999999999999999999999999955555555555555555555555566655555555555555666555555599999999999999999999999
            5555555555555555555555ffff55555555555555555555555555555555599999999999999999999999995555555555555555555555555555555555555555555666555555555999999999999999999999
            555555555555555555555ffffffff55555555555555555555555555555555599999999999999999955555555555555555555555555555555555555555555555666555555555559999999999999999999
            555555555555555555555fffffffffff55555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555666555555555555599999999999999999
            55555555555555555555ffffffffffffff555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555666555555555555559999999999999999
            55555555555555555555ffffeeeffffffffff555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555666555555555555555555999999999999
            5555555555555555555ffffeeeeeeeffffffffff555555555555555555555555555555555555555555555555555555555555555555555555555555555555555666555555555555555555599999999999
            5555555555555555555ffffeeeeeeeeefffffffffff555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555559999999999
            555555555555555555ffffeeeffffeeeeeefffffffffff555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555559999999999
            555555555555555555ffffeeeffffffeeeeeeeffffffffff5555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555599999999
            55555555555555555ffffeeeeffffffffffeeeeeeffffffffff5555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555999999
            55555555555555555ffffeeeeefffffffffffffeeeeeffffffffff5555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555559999
            5555555555555555ffffeeeeeeeeffffffffffffeeeeeeffffffffff55555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555999
            555555555555555fffffeeefffeeeeeeffffffffeeeeeeeeefffffff55555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555599
            555555555555555ffffeeeeffffffeeeeeeeffffeefffffeeeeeffff55555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
            55555555555555ffffeeeeefffffffeeeeeeeeeeeeffffffeeeefff555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
            55555555555555ffffeeeeeeffffffffeeeeeeeeeeffffffeeeffff555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
            5555555555555ffffeeeeeeeeefffffffffeeeeeeeeeffffeeeffff555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
            5555555555555ffffeefffeeeeefffffffffffeeeeeeeeeeeeefff5555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
            555555555555ffffeeeffffeeeeeefffffffffffeeeeeeeeeeffff5555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
            555555555555ffffeeeffffeeeeeeeeefffffffffffeeeeeeeffff5555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
            555555555555fffeeeeefffeffffeeeeeeefffffffffffeeeefff55555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
            555555555555fffffeeeeeeeffffffffeeeeeeffffffffeeeffff55555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
            555555555555fffffffeeeeefffffffffffeeeeeeeffffeeeffff55555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
            5555555555555ffffffffeeeefffffffffffeeeeeeeeeeeeefff555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
            555555555555555ffffffffeeeeeeffffffffffeeeeeeeeeffff555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
            5555555555555555fffffffffeeeeeeeefffffffeeeeeeeeffff555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
            555555555555555ffffffffffffeeeeeeefffffffffeeeeefff5555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
            555555555555555ffffeeffffffffeeeeeeeffffffffeeeffff5555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
            555555555555555fffeeeeeffffffffeeeeeeeffffffeeeffff5555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
            55555555555555ffffeeeeeeeffffffffeeeeeeeffffeeefff55555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
            55555555555555ffffeeeeeeeeeffffffffeeeeeeeeeeeffff55555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
            5555555555555ffffeeeeeeeeeeeeffffffffeeeeeeeeeffff55555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
            5555555555555ffffeeeeeeeeeeeeeeffffffffeeeeeeefff555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
            555555555555ffffeeeeeeeeeeeeeefffffffffffeeeeffff555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
            555555555555ffffeeeeeeeeeeeeeeffff5ffffffffeeffff555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
            55555555555ffffeeeeeeeeeeeeeeffff5555fffffffffff5555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
            55555555555ffffeeeeeeeeeeeeefffff555555fffffffff5555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
            55555555555fffeeeeeeeeeeeeeeffff555555555fffffff5555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
            5555555555ffffeeeeeeeeeeeeeffff555555555555fff555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
            5555554444ffffeeeeeeeeeeeefffff555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
            5555554444fffeeeeeeeeeeeeeffff5555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
            555555444444feeeeeeeeeeeeffff55555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
            55555555544444444eeeeeeefffff55555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
            5555555554444444444eeeeeffff555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
            5555555555544444444eee444ff5555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
            5555555555555555444eee444ff5555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
            5555555555555555444eee444f55555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
            5555555555555555554444444555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
            5555555555555555554444444555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
            5555555555555555554444555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
            5555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
            5555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
            5555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
            5555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
            5555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
            5555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
            5555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
            `)
        story.printCharacterText("This is the desert")
        story.printCharacterText("A place with no water at all")
        story.printCharacterText("And that's why Coco Sam and Captain Cat moved there")
        story.printCharacterText("They were so board of water and sea sick")
        story.printCharacterText("Well all the cats were sea sick but Sam")
        story.printCharacterText("So when Captain Cat got a message saying a new evil was in the ocean they ran to the ocean because the dessert was way to dry for them")
    }
    if (sprites.readDataBoolean(mySprite, "bad")) {
        let Badlevles: tiles.TileMapData[] = []
        tiles.setCurrentTilemap(Badlevles[sprites.readDataNumber(mySprite, "setlwvel")])
    } else {
        tiles.setCurrentTilemap(levelslishthreebravedogs[sprites.readDataNumber(mySprite, "setlwvel")])
    }
    Player_1 = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player)
    Player_2 = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.NPC)
    Player_3 = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.NPC)
    if (blockSettings.readString("Player1") == "Coco") {
        Player_1.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . f . . . f . . . . . . . 
            . . . . f f . . f f . . . . . . 
            . . . . f f f f f f . . . . . . 
            . . . . f 1 3 f 1 3 . . . . . . 
            . . . . f 1 3 f 1 3 . . . . . . 
            . . . . f f f f f f . . . . . . 
            . . . . . . f f . . . . . . . . 
            . . . . f f f f f f . . . . . . 
            . . . f . f 1 1 f . f . . . . . 
            . . . f . f 1 1 f . f . . . . . 
            . . . . . f 1 1 f . . . . . . . 
            . f f f f f f f f . . . . . . . 
            . . . . . f . . f . . . . . . . 
            . . . . . f . . f . . . . . . . 
            . . . . . f . . f . . . . . . . 
            `)
        characterAnimations.loopFrames(
        Player_1,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . f . . . f . . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . f f f f f f f f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . f . . . f . . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . f f f f f f f f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . f . . . f . . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . f f f f f f f f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . f . . . f . . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . f f f f f f f f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . f . . . f . . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . f f . . f 1 1 f . . . . . . 
            . . . . f f f f f f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . f . . . f . . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . f f f f f f f f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            `],
        100,
        characterAnimations.rule(Predicate.FacingRight)
        )
        characterAnimations.loopFrames(
        Player_1,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f . . . f . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . . . . . f f f f f f f f . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f . . . f . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . . . . . f f f f f f f f . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f . . . f . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . . . . . f f f f f f f f . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f . . . f . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . . . . . f f f f f f f f . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . f . . . f . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . f f . . 
            . . . . . . f f f f f f . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . f . . . f . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . . . . . f f f f f f f f . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            `],
        100,
        characterAnimations.rule(Predicate.FacingLeft)
        )
        characterAnimations.loopFrames(
        Player_1,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f . . . f . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . . . . . f f f f f f f f . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f . . . f . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . . . . . f f f f f f f f . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f . . . f . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . . . . . f f f f f f f f . . 
            . . . . . . . f f . . . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . . . f . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . f . . . f . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . f f . . 
            . . . . . . f f f f f f . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . . . . f . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . f . . . f . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . . . . . f f f f f f f f . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            `],
        100,
        characterAnimations.rule(Predicate.MovingLeft, Predicate.HittingWallDown)
        )
        characterAnimations.loopFrames(
        Player_1,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . f . . . f . . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . f f f f f f f f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . f . . . f . . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . f f f f f f f f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . . . . f . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . f . . . f . . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . f f f f f f f f . . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . . . . f . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . f . . . f . . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . f f . . f 1 1 f . . . . . . 
            . . . . f f f f f f . . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . . . f . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . f . . . f . . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . f f f f f f f f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            `],
        100,
        characterAnimations.rule(Predicate.MovingRight, Predicate.HittingWallDown)
        )
    }
    if (blockSettings.readString("Player1") == "Sam") {
        Player_1.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . 4 . . . 4 . . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . 4 4 4 4 4 4 4 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `)
        characterAnimations.loopFrames(
        Player_1,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . 4 . . . 4 . . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . 4 4 4 4 4 4 4 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . 4 . . . 4 . . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . 4 4 4 4 4 4 4 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . 4 . . . 4 . . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . 4 4 4 4 4 4 4 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . 4 . . . 4 . . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . 4 4 4 4 4 4 4 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 4 . . . 4 . . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . 4 4 . . 4 1 1 4 . . . . . . 
            . . . . 4 4 4 4 4 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 4 . . . 4 . . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . 4 4 4 4 4 4 4 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `],
        100,
        characterAnimations.rule(Predicate.FacingRight)
        )
        characterAnimations.loopFrames(
        Player_1,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 4 . . . 4 . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . . . . . 4 4 4 4 4 4 4 4 . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 4 . . . 4 . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . . . . . 4 4 4 4 4 4 4 4 . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 4 . . . 4 . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . . . . . 4 4 4 4 4 4 4 4 . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 4 . . . 4 . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . . . . . 4 4 4 4 4 4 4 4 . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . 4 . . . 4 . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . 4 4 . . 
            . . . . . . 4 4 4 4 4 4 . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . 4 . . . 4 . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . . . . . 4 4 4 4 4 4 4 4 . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `],
        100,
        characterAnimations.rule(Predicate.FacingLeft)
        )
        characterAnimations.loopFrames(
        Player_1,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 4 . . . 4 . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . . . . . 4 4 4 4 4 4 4 4 . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 4 . . . 4 . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . . . . . 4 4 4 4 4 4 4 4 . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 4 . . . 4 . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . . . . . 4 4 4 4 4 4 4 4 . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . . 4 . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . 4 . . . 4 . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . 4 4 . . 
            . . . . . . 4 4 4 4 4 4 . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . . . 4 . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . 4 . . . 4 . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . . . . . 4 4 4 4 4 4 4 4 . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `],
        100,
        characterAnimations.rule(Predicate.MovingLeft, Predicate.HittingWallDown)
        )
        characterAnimations.loopFrames(
        Player_1,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . 4 . . . 4 . . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . 4 4 4 4 4 4 4 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . 4 . . . 4 . . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . 4 4 4 4 4 4 4 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . . . . 4 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . 4 . . . 4 . . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . 4 4 4 4 4 4 4 4 . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . . . 4 . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 4 . . . 4 . . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . 4 4 . . 4 1 1 4 . . . . . . 
            . . . . 4 4 4 4 4 4 . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . . 4 . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 4 . . . 4 . . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . 4 4 4 4 4 4 4 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `],
        100,
        characterAnimations.rule(Predicate.MovingRight, Predicate.HittingWallDown)
        )
    }
    if (blockSettings.readString("Player1") == "Captain Cat") {
        Player_1.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . 2 2 2 2 2 2 . . . . . . 
            . . . . 2 2 2 2 2 2 2 2 . . . . 
            . . . . 1 1 1 1 1 1 . . . . . . 
            . . . . 1 d f 1 d f . . . . . . 
            . . . . 1 d f 1 d f . . . . . . 
            . . . . 1 1 1 1 1 1 . . . . . . 
            . . . . . . 1 1 . . . . . . . . 
            . . . . 1 1 1 1 1 1 . . . . . . 
            . . . 1 . 1 d d 1 . 1 . . . . . 
            . . . 1 . 1 d d 1 . 1 . . . . . 
            . . . . . 1 d d 1 . . . . . . . 
            . 1 1 1 1 1 1 1 1 . . . . . . . 
            . . . . . 1 . . 1 . . . . . . . 
            . . . . . 1 . . 1 . . . . . . . 
            . . . . . 1 . . 1 . . . . . . . 
            `)
        characterAnimations.loopFrames(
        Player_1,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . . . 2 2 2 2 2 2 2 2 . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . 1 1 1 1 1 1 1 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . . . 2 2 2 2 2 2 2 2 . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . 1 1 1 1 1 1 1 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . . . 2 2 2 2 2 2 2 2 . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . 1 1 1 1 1 1 1 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . . . 2 2 2 2 2 2 2 2 . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . 1 1 1 1 1 1 1 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . . . 2 2 2 2 2 2 2 2 . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . 1 1 . . 1 d d 1 . . . . . . 
            . . . . 1 1 1 1 1 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . . . 2 2 2 2 2 2 2 2 . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . 1 1 1 1 1 1 1 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            `],
        100,
        characterAnimations.rule(Predicate.FacingRight)
        )
        characterAnimations.loopFrames(
        Player_1,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . 2 2 2 2 2 2 2 2 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . . . . . 1 1 1 1 1 1 1 1 . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . 2 2 2 2 2 2 2 2 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . . . . . 1 1 1 1 1 1 1 1 . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . 2 2 2 2 2 2 2 2 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . . . . . 1 1 1 1 1 1 1 1 . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . 2 2 2 2 2 2 2 2 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . . . . . 1 1 1 1 1 1 1 1 . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . 2 2 2 2 2 2 2 2 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . 1 1 . . 
            . . . . . . 1 1 1 1 1 1 . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . 2 2 2 2 2 2 2 2 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . . . . . 1 1 1 1 1 1 1 1 . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            `],
        100,
        characterAnimations.rule(Predicate.FacingLeft)
        )
        characterAnimations.loopFrames(
        Player_1,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . 2 2 2 2 2 2 2 2 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . . . . . 1 1 1 1 1 1 1 1 . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . 2 2 2 2 2 2 2 2 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . . . . . 1 1 1 1 1 1 1 1 . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . 2 2 2 2 2 2 2 2 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . . . . . 1 1 1 1 1 1 1 1 . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . . . 1 . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . 2 2 2 2 2 2 2 2 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . 1 1 . . 
            . . . . . . 1 1 1 1 1 1 . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . . . . 1 . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . 2 2 2 2 2 2 2 2 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . . . . . 1 1 1 1 1 1 1 1 . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            `],
        100,
        characterAnimations.rule(Predicate.MovingLeft, Predicate.HittingWallDown)
        )
        characterAnimations.loopFrames(
        Player_1,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . . . 2 2 2 2 2 2 2 2 . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . 1 1 1 1 1 1 1 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . . . 2 2 2 2 2 2 2 2 . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . 1 1 1 1 1 1 1 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . . . . 1 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . . . 2 2 2 2 2 2 2 2 . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . 1 1 1 1 1 1 1 1 . . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . . . . 1 . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . . . 2 2 2 2 2 2 2 2 . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . 1 1 . . 1 d d 1 . . . . . . 
            . . . . 1 1 1 1 1 1 . . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . . . 1 . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . . . 2 2 2 2 2 2 2 2 . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . 1 1 1 1 1 1 1 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            `],
        100,
        characterAnimations.rule(Predicate.MovingRight, Predicate.HittingWallDown)
        )
    }
    if (blockSettings.readString("Player2") == "Sam") {
        Player_2.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . 4 . . . 4 . . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . 4 4 4 4 4 4 4 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `)
        characterAnimations.loopFrames(
        Player_2,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . 4 . . . 4 . . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . 4 4 4 4 4 4 4 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . 4 . . . 4 . . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . 4 4 4 4 4 4 4 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . 4 . . . 4 . . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . 4 4 4 4 4 4 4 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . 4 . . . 4 . . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . 4 4 4 4 4 4 4 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 4 . . . 4 . . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . 4 4 . . 4 1 1 4 . . . . . . 
            . . . . 4 4 4 4 4 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 4 . . . 4 . . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . 4 4 4 4 4 4 4 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `],
        100,
        characterAnimations.rule(Predicate.FacingRight)
        )
        characterAnimations.loopFrames(
        Player_2,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 4 . . . 4 . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . . . . . 4 4 4 4 4 4 4 4 . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 4 . . . 4 . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . . . . . 4 4 4 4 4 4 4 4 . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 4 . . . 4 . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . . . . . 4 4 4 4 4 4 4 4 . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 4 . . . 4 . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . . . . . 4 4 4 4 4 4 4 4 . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . 4 . . . 4 . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . 4 4 . . 
            . . . . . . 4 4 4 4 4 4 . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . 4 . . . 4 . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . . . . . 4 4 4 4 4 4 4 4 . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `],
        100,
        characterAnimations.rule(Predicate.FacingLeft)
        )
        characterAnimations.loopFrames(
        Player_2,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 4 . . . 4 . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . . . . . 4 4 4 4 4 4 4 4 . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 4 . . . 4 . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . . . . . 4 4 4 4 4 4 4 4 . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 4 . . . 4 . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . . . . . 4 4 4 4 4 4 4 4 . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . . 4 . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . 4 . . . 4 . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . 4 4 . . 
            . . . . . . 4 4 4 4 4 4 . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . . . 4 . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . 4 . . . 4 . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . . . . . 4 4 4 4 4 4 4 4 . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `],
        100,
        characterAnimations.rule(Predicate.MovingLeft, Predicate.HittingWallDown)
        )
        characterAnimations.loopFrames(
        Player_2,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . 4 . . . 4 . . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . 4 4 4 4 4 4 4 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . 4 . . . 4 . . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . 4 4 4 4 4 4 4 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . . . . 4 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . 4 . . . 4 . . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . 4 4 4 4 4 4 4 4 . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . . . 4 . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 4 . . . 4 . . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . 4 4 . . 4 1 1 4 . . . . . . 
            . . . . 4 4 4 4 4 4 . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . . 4 . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 4 . . . 4 . . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . 4 4 4 4 4 4 4 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `],
        100,
        characterAnimations.rule(Predicate.MovingRight, Predicate.HittingWallDown)
        )
    }
    if (blockSettings.readString("Player2") == "Captain Cat") {
        Player_2.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . 2 2 2 2 2 2 . . . . . . 
            . . . . 2 2 2 2 2 2 2 2 . . . . 
            . . . . 1 1 1 1 1 1 . . . . . . 
            . . . . 1 d f 1 d f . . . . . . 
            . . . . 1 d f 1 d f . . . . . . 
            . . . . 1 1 1 1 1 1 . . . . . . 
            . . . . . . 1 1 . . . . . . . . 
            . . . . 1 1 1 1 1 1 . . . . . . 
            . . . 1 . 1 d d 1 . 1 . . . . . 
            . . . 1 . 1 d d 1 . 1 . . . . . 
            . . . . . 1 d d 1 . . . . . . . 
            . 1 1 1 1 1 1 1 1 . . . . . . . 
            . . . . . 1 . . 1 . . . . . . . 
            . . . . . 1 . . 1 . . . . . . . 
            . . . . . 1 . . 1 . . . . . . . 
            `)
        characterAnimations.loopFrames(
        Player_2,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . . . 2 2 2 2 2 2 2 2 . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . 1 1 1 1 1 1 1 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . . . 2 2 2 2 2 2 2 2 . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . 1 1 1 1 1 1 1 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . . . 2 2 2 2 2 2 2 2 . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . 1 1 1 1 1 1 1 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . . . 2 2 2 2 2 2 2 2 . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . 1 1 1 1 1 1 1 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . . . 2 2 2 2 2 2 2 2 . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . 1 1 . . 1 d d 1 . . . . . . 
            . . . . 1 1 1 1 1 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . . . 2 2 2 2 2 2 2 2 . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . 1 1 1 1 1 1 1 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            `],
        100,
        characterAnimations.rule(Predicate.FacingRight)
        )
        characterAnimations.loopFrames(
        Player_2,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . 2 2 2 2 2 2 2 2 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . . . . . 1 1 1 1 1 1 1 1 . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . 2 2 2 2 2 2 2 2 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . . . . . 1 1 1 1 1 1 1 1 . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . 2 2 2 2 2 2 2 2 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . . . . . 1 1 1 1 1 1 1 1 . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . 2 2 2 2 2 2 2 2 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . . . . . 1 1 1 1 1 1 1 1 . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . 2 2 2 2 2 2 2 2 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . 1 1 . . 
            . . . . . . 1 1 1 1 1 1 . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . 2 2 2 2 2 2 2 2 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . . . . . 1 1 1 1 1 1 1 1 . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            `],
        100,
        characterAnimations.rule(Predicate.FacingLeft)
        )
        characterAnimations.loopFrames(
        Player_2,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . 2 2 2 2 2 2 2 2 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . . . . . 1 1 1 1 1 1 1 1 . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . 2 2 2 2 2 2 2 2 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . . . . . 1 1 1 1 1 1 1 1 . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . 2 2 2 2 2 2 2 2 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . . . . . 1 1 1 1 1 1 1 1 . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . . . 1 . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . 2 2 2 2 2 2 2 2 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . 1 1 . . 
            . . . . . . 1 1 1 1 1 1 . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . . . . 1 . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . 2 2 2 2 2 2 2 2 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . . . . . 1 1 1 1 1 1 1 1 . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            `],
        100,
        characterAnimations.rule(Predicate.MovingLeft, Predicate.HittingWallDown)
        )
        characterAnimations.loopFrames(
        Player_2,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . . . 2 2 2 2 2 2 2 2 . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . 1 1 1 1 1 1 1 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . . . 2 2 2 2 2 2 2 2 . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . 1 1 1 1 1 1 1 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . . . . 1 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . . . 2 2 2 2 2 2 2 2 . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . 1 1 1 1 1 1 1 1 . . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . . . . 1 . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . . . 2 2 2 2 2 2 2 2 . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . 1 1 . . 1 d d 1 . . . . . . 
            . . . . 1 1 1 1 1 1 . . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . . . 1 . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . . . 2 2 2 2 2 2 2 2 . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . 1 1 1 1 1 1 1 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            `],
        100,
        characterAnimations.rule(Predicate.MovingRight, Predicate.HittingWallDown)
        )
    }
    if (blockSettings.readString("Player2") == "Coco") {
        Player_2.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . f . . . f . . . . . . . 
            . . . . f f . . f f . . . . . . 
            . . . . f f f f f f . . . . . . 
            . . . . f 1 3 f 1 3 . . . . . . 
            . . . . f 1 3 f 1 3 . . . . . . 
            . . . . f f f f f f . . . . . . 
            . . . . . . f f . . . . . . . . 
            . . . . f f f f f f . . . . . . 
            . . . f . f 1 1 f . f . . . . . 
            . . . f . f 1 1 f . f . . . . . 
            . . . . . f 1 1 f . . . . . . . 
            . f f f f f f f f . . . . . . . 
            . . . . . f . . f . . . . . . . 
            . . . . . f . . f . . . . . . . 
            . . . . . f . . f . . . . . . . 
            `)
        characterAnimations.loopFrames(
        Player_2,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . f . . . f . . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . f f f f f f f f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . f . . . f . . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . f f f f f f f f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . f . . . f . . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . f f f f f f f f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . f . . . f . . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . f f f f f f f f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . f . . . f . . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . f f . . f 1 1 f . . . . . . 
            . . . . f f f f f f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . f . . . f . . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . f f f f f f f f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            `],
        100,
        characterAnimations.rule(Predicate.FacingRight)
        )
        characterAnimations.loopFrames(
        Player_2,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f . . . f . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . . . . . f f f f f f f f . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f . . . f . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . . . . . f f f f f f f f . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f . . . f . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . . . . . f f f f f f f f . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f . . . f . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . . . . . f f f f f f f f . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . f . . . f . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . f f . . 
            . . . . . . f f f f f f . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . f . . . f . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . . . . . f f f f f f f f . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            `],
        100,
        characterAnimations.rule(Predicate.FacingLeft)
        )
        characterAnimations.loopFrames(
        Player_2,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f . . . f . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . . . . . f f f f f f f f . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f . . . f . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . . . . . f f f f f f f f . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f . . . f . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . . . . . f f f f f f f f . . 
            . . . . . . . f f . . . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . . . f . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . f . . . f . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . f f . . 
            . . . . . . f f f f f f . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . . . . f . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . f . . . f . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . . . . . f f f f f f f f . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            `],
        100,
        characterAnimations.rule(Predicate.MovingLeft, Predicate.HittingWallDown)
        )
        characterAnimations.loopFrames(
        Player_2,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . f . . . f . . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . f f f f f f f f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . f . . . f . . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . f f f f f f f f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . . . . f . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . f . . . f . . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . f f f f f f f f . . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . . . . f . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . f . . . f . . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . f f . . f 1 1 f . . . . . . 
            . . . . f f f f f f . . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . . . f . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . f . . . f . . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . f f f f f f f f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            `],
        100,
        characterAnimations.rule(mySprite.x, Predicate.HittingWallDown)
        )
    }
    if (blockSettings.readString("Player3") == "Captain Cat") {
        Player_3.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . 2 2 2 2 2 2 . . . . . . 
            . . . . 2 2 2 2 2 2 2 2 . . . . 
            . . . . 1 1 1 1 1 1 . . . . . . 
            . . . . 1 d f 1 d f . . . . . . 
            . . . . 1 d f 1 d f . . . . . . 
            . . . . 1 1 1 1 1 1 . . . . . . 
            . . . . . . 1 1 . . . . . . . . 
            . . . . 1 1 1 1 1 1 . . . . . . 
            . . . 1 . 1 d d 1 . 1 . . . . . 
            . . . 1 . 1 d d 1 . 1 . . . . . 
            . . . . . 1 d d 1 . . . . . . . 
            . 1 1 1 1 1 1 1 1 . . . . . . . 
            . . . . . 1 . . 1 . . . . . . . 
            . . . . . 1 . . 1 . . . . . . . 
            . . . . . 1 . . 1 . . . . . . . 
            `)
        characterAnimations.loopFrames(
        Player_3,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . . . 2 2 2 2 2 2 2 2 . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . 1 1 1 1 1 1 1 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . . . 2 2 2 2 2 2 2 2 . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . 1 1 1 1 1 1 1 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . . . 2 2 2 2 2 2 2 2 . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . 1 1 1 1 1 1 1 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . . . 2 2 2 2 2 2 2 2 . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . 1 1 1 1 1 1 1 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . . . 2 2 2 2 2 2 2 2 . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . 1 1 . . 1 d d 1 . . . . . . 
            . . . . 1 1 1 1 1 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . . . 2 2 2 2 2 2 2 2 . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . 1 1 1 1 1 1 1 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            `],
        100,
        characterAnimations.rule(Predicate.FacingRight)
        )
        characterAnimations.loopFrames(
        Player_3,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . 2 2 2 2 2 2 2 2 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . . . . . 1 1 1 1 1 1 1 1 . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . 2 2 2 2 2 2 2 2 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . . . . . 1 1 1 1 1 1 1 1 . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . 2 2 2 2 2 2 2 2 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . . . . . 1 1 1 1 1 1 1 1 . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . 2 2 2 2 2 2 2 2 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . . . . . 1 1 1 1 1 1 1 1 . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . 2 2 2 2 2 2 2 2 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . 1 1 . . 
            . . . . . . 1 1 1 1 1 1 . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . 2 2 2 2 2 2 2 2 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . . . . . 1 1 1 1 1 1 1 1 . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            `],
        100,
        characterAnimations.rule(Predicate.FacingLeft)
        )
        characterAnimations.loopFrames(
        Player_3,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . 2 2 2 2 2 2 2 2 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . . . . . 1 1 1 1 1 1 1 1 . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . 2 2 2 2 2 2 2 2 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . . . . . 1 1 1 1 1 1 1 1 . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . 2 2 2 2 2 2 2 2 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . . . . . 1 1 1 1 1 1 1 1 . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . . . 1 . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . 2 2 2 2 2 2 2 2 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . 1 1 . . 
            . . . . . . 1 1 1 1 1 1 . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . . . . 1 . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . 2 2 2 2 2 2 2 2 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . f d 1 f d 1 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . . . . . 1 1 1 1 1 1 1 1 . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            `],
        100,
        characterAnimations.rule(Predicate.MovingLeft, Predicate.HittingWallDown)
        )
        characterAnimations.loopFrames(
        Player_3,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . . . 2 2 2 2 2 2 2 2 . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . 1 1 1 1 1 1 1 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . . . 2 2 2 2 2 2 2 2 . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . 1 1 1 1 1 1 1 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . . . . 1 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . . . 2 2 2 2 2 2 2 2 . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . 1 1 1 1 1 1 1 1 . . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . . . . 1 . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . . . 2 2 2 2 2 2 2 2 . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . 1 1 . . 1 d d 1 . . . . . . 
            . . . . 1 1 1 1 1 1 . . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . . . 1 . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . . . 2 2 2 2 2 2 2 2 . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 d f 1 d f . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . 1 . 1 d d 1 . 1 . . . . 
            . . . . . . 1 d d 1 . . . . . . 
            . . 1 1 1 1 1 1 1 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            . . . . . . 1 . . 1 . . . . . . 
            `],
        100,
        characterAnimations.rule(Predicate.MovingRight, Predicate.HittingWallDown)
        )
    }
    if (blockSettings.readString("Player3") == "Coco") {
        Player_3.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . f . . . f . . . . . . . 
            . . . . f f . . f f . . . . . . 
            . . . . f f f f f f . . . . . . 
            . . . . f 1 3 f 1 3 . . . . . . 
            . . . . f 1 3 f 1 3 . . . . . . 
            . . . . f f f f f f . . . . . . 
            . . . . . . f f . . . . . . . . 
            . . . . f f f f f f . . . . . . 
            . . . f . f 1 1 f . f . . . . . 
            . . . f . f 1 1 f . f . . . . . 
            . . . . . f 1 1 f . . . . . . . 
            . f f f f f f f f . . . . . . . 
            . . . . . f . . f . . . . . . . 
            . . . . . f . . f . . . . . . . 
            . . . . . f . . f . . . . . . . 
            `)
        characterAnimations.loopFrames(
        Player_3,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . f . . . f . . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . f f f f f f f f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . f . . . f . . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . f f f f f f f f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . f . . . f . . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . f f f f f f f f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . f . . . f . . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . f f f f f f f f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . f . . . f . . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . f f . . f 1 1 f . . . . . . 
            . . . . f f f f f f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . f . . . f . . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . f f f f f f f f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            `],
        100,
        characterAnimations.rule(Predicate.FacingRight)
        )
        characterAnimations.loopFrames(
        Player_3,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f . . . f . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . . . . . f f f f f f f f . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f . . . f . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . . . . . f f f f f f f f . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f . . . f . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . . . . . f f f f f f f f . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f . . . f . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . . . . . f f f f f f f f . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . f . . . f . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . f f . . 
            . . . . . . f f f f f f . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . f . . . f . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . . . . . f f f f f f f f . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            `],
        100,
        characterAnimations.rule(Predicate.FacingLeft)
        )
        characterAnimations.loopFrames(
        Player_3,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f . . . f . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . . . . . f f f f f f f f . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f . . . f . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . . . . . f f f f f f f f . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f . . . f . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . . . . . f f f f f f f f . . 
            . . . . . . . f f . . . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . . . f . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . f . . . f . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . f f . . 
            . . . . . . f f f f f f . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . . . . f . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . f . . . f . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . 3 1 f 3 1 f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . . . . . f f f f f f f f . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            `],
        100,
        characterAnimations.rule(Predicate.MovingLeft, Predicate.HittingWallDown)
        )
        characterAnimations.loopFrames(
        Player_3,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . f . . . f . . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . f f f f f f f f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . f . . . f . . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . f f f f f f f f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . . . . f . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . f . . . f . . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . f f f f f f f f . . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . . . . f . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . f . . . f . . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . f f . . f 1 1 f . . . . . . 
            . . . . f f f f f f . . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . . . f . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . f . . . f . . . . . . 
            . . . . . f f . . f f . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f 1 3 f 1 3 . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . f . f 1 1 f . f . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . f f f f f f f f . . . . . . 
            . . . . . . f . . f . . . . . . 
            . . . . . . f . . f . . . . . . 
            `],
        100,
        characterAnimations.rule(Predicate.MovingRight, Predicate.HittingWallDown)
        )
    }
    if (blockSettings.readString("Player3") == "Sam") {
        Player_3.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . 4 . . . 4 . . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . 4 4 4 4 4 4 4 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `)
        characterAnimations.loopFrames(
        Player_3,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . 4 . . . 4 . . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . 4 4 4 4 4 4 4 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . 4 . . . 4 . . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . 4 4 4 4 4 4 4 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . 4 . . . 4 . . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . 4 4 4 4 4 4 4 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . 4 . . . 4 . . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . 4 4 4 4 4 4 4 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 4 . . . 4 . . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . 4 4 . . 4 1 1 4 . . . . . . 
            . . . . 4 4 4 4 4 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 4 . . . 4 . . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . 4 4 4 4 4 4 4 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `],
        100,
        characterAnimations.rule(Predicate.FacingRight)
        )
        characterAnimations.loopFrames(
        Player_3,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 4 . . . 4 . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . . . . . 4 4 4 4 4 4 4 4 . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 4 . . . 4 . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . . . . . 4 4 4 4 4 4 4 4 . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 4 . . . 4 . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . . . . . 4 4 4 4 4 4 4 4 . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 4 . . . 4 . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . . . . . 4 4 4 4 4 4 4 4 . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . 4 . . . 4 . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . 4 4 . . 
            . . . . . . 4 4 4 4 4 4 . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . 4 . . . 4 . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . . . . . 4 4 4 4 4 4 4 4 . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `],
        100,
        characterAnimations.rule(Predicate.FacingLeft)
        )
        characterAnimations.loopFrames(
        Player_3,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 4 . . . 4 . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . . . . . 4 4 4 4 4 4 4 4 . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 4 . . . 4 . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . . . . . 4 4 4 4 4 4 4 4 . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 4 . . . 4 . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . . . . . 4 4 4 4 4 4 4 4 . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . . 4 . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . 4 . . . 4 . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . 4 4 . . 
            . . . . . . 4 4 4 4 4 4 . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . . . 4 . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . 4 . . . 4 . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 6 1 4 6 1 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . . . . . 4 4 4 4 4 4 4 4 . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `],
        100,
        characterAnimations.rule(Predicate.MovingLeft, Predicate.HittingWallDown)
        )
        characterAnimations.loopFrames(
        Player_3,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . 4 . . . 4 . . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . 4 4 4 4 4 4 4 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . 4 . . . 4 . . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . 4 4 4 4 4 4 4 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . . . . 4 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . 4 . . . 4 . . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . 4 4 4 4 4 4 4 4 . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . . . 4 . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 4 . . . 4 . . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . 4 4 . . 4 1 1 4 . . . . . . 
            . . . . 4 4 4 4 4 4 . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . . 4 . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 4 . . . 4 . . . . . . 
            . . . . . 4 4 . . 4 4 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 1 6 4 1 6 . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . 4 4 4 4 4 4 . . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . 4 . 4 1 1 4 . 4 . . . . 
            . . . . . . 4 1 1 4 . . . . . . 
            . . 4 4 4 4 4 4 4 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            . . . . . . 4 . . 4 . . . . . . 
            `],
        100,
        characterAnimations.rule(Predicate.MovingRight, Predicate.HittingWallDown)
        )
    }
    scene.setBackgroundImage(img`
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        `)
    controller.moveSprite(Player_1, 100, 0)
    Player_1.ay = 300
    Player_2.ay = 300
    Player_3.ay = 300
    sprites.setDataString(Player_1, "cat", blockSettings.readString("Player1"))
    sprites.setDataString(Player_2, "cat", blockSettings.readString("Player2"))
    sprites.setDataString(Player_3, "cat", blockSettings.readString("Player3"))
    game_on = true
    scene.cameraFollowSprite(Player_1)
    levelnublucasM = sprites.readDataNumber(mySprite, "setlwvel")
    sprites.setDataBoolean(Player_1, "left", false)
    sprites.setDataBoolean(Player_1, "right", true)
    sprites.setDataBoolean(Player_2, "left", false)
    sprites.setDataBoolean(Player_2, "right", true)
    sprites.setDataBoolean(Player_3, "left", false)
    sprites.setDataBoolean(Player_3, "right", true)
    sprites.setDataNumber(Player_1, "hp", 3)
    sprites.setDataNumber(Player_2, "hp", 3)
    sprites.setDataNumber(Player_3, "hp", 3)
    bothdead = false
    sprites.setDataSprite(Player_1, "hpim", sprites.create(img`
        . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . 
        f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f 
        f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f 
        . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . 
        . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . 
        `, SpriteKind.hp))
    sprites.readDataSprite(Player_1, "hpim").setFlag(SpriteFlag.Ghost, true)
    sprites.setDataSprite(Player_2, "hpim", sprites.create(img`
        . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . 
        f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f 
        f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f 
        . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . 
        . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . 
        `, SpriteKind.hp))
    sprites.setDataSprite(Player_3, "hpim", sprites.create(img`
        . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . 
        f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f 
        f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f 
        . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . 
        . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . 
        `, SpriteKind.hp))
    sprites.readDataSprite(Player_2, "hpim").setFlag(SpriteFlag.Ghost, true)
    sprites.readDataSprite(Player_3, "hpim").setFlag(SpriteFlag.Ghost, true)
    if (p2) {
        Player_2.setKind(SpriteKind.Player)
    }
    if (blockSettings.readString("Player2") == "solo") {
        sprites.readDataSprite(Player_2, "hpim").destroy()
        sprites.readDataSprite(Player_3, "hpim").destroy()
        Player_2.destroy()
        Player_3.destroy()
    }
    if (blockSettings.readNumber("checkpoint") == levelnublucasM) {
        tiles.placeOnRandomTile(Player_1, assets.tile`myTile54`)
        tiles.placeOnRandomTile(Player_2, assets.tile`myTile54`)
        tiles.placeOnRandomTile(Player_3, assets.tile`myTile54`)
    } else {
        tiles.placeOnRandomTile(Player_1, assets.tile`myTile48`)
        tiles.placeOnRandomTile(Player_2, assets.tile`myTile48`)
        tiles.placeOnRandomTile(Player_3, assets.tile`myTile48`)
    }
    Enmays()
    NPCsF(mySprite)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.EP_NOTTHEMUCISTIME, function (sprite, otherSprite) {
    otherSprite.destroy()
    partical = sprites.create(img`
        . . . . . . . . 
        . . . . . 1 . . 
        . . . . 1 1 . . 
        . . . . . 1 . . 
        . 1 1 1 . 1 . . 
        . . . . . 1 . . 
        . . . . 1 1 1 . 
        . . . . . . . . 
        `, SpriteKind.Bakeground)
    partical.setPosition(sprite.x, sprite.y)
    partical.setVelocity(randint(-50, 50), randint(-50, 50))
    partical.setFlag(SpriteFlag.GhostThroughWalls, true)
    sprites.changeDataNumberBy(sprite, "hp", -1)
    partical.lifespan = 500
    music.powerDown.play()
    if (sprites.readDataNumber(sprite, "hp") <= 0) {
        game.over(false)
    }
})
function zoomswich2 () {
    if (zoom3) {
        zoom3 = false
    } else {
        zoom3 = true
    }
}
function The_Phoenix_s_Quest() {
    web.open("https://arcade.makecode.com/47124-18059-14333-69825")
}
function Flying_Through_Time() {
    web.open("https://arcade.makecode.com/30418-01173-18811-61378")
}
function Three_brave_cats() {
    web.open("https://arcade.makecode.com/34166-47365-47270-50791")
}
scene.systemMenu.addEntry(() => `The Phoenix's Quest`, () => The_Phoenix_s_Quest(), img`
    99999999999999999999999999999999
    99999999999999999999999999999999
    99999999999999999999999999999999
    99999999999999999999999999999999
    99999999999999999999999999999999
    99999999999999999999999999999999
    11111111119999999999999999999999
    11111111111999999999999999999999
    11111111111999999999999999999999
    9999999999999999999999999999999c
    9999999999999999999999999c9999c1
    999999999999999111111119cc9999c1
    999999999999991111111111cc9999c1
    99999999999999111111111c1c999c11
    99999999999999999999999c1c999c1d
    9999999999999999999991c11c11cddd
    9999999999999999999911c1dc11cdbd
    9999999999999999999911cddc11cbbb
    999999ee9e9e999999999cdddc9cbbbb
    999999eeeee9999999999cdbdc9cbbbb
    999999dfef9999999999cbbbbccbbbbb
    999999dfdf9999999999cbbbbbcbbbbb
    999999dddd999999999cbbbbbbcbbbbb
    9999988bb8899999999cbbbbbbcbbbbb
    9999e66bb669999999cbbbbbbbcbbbbb
    9999e6bbbb69999999cbbbbbbbcbbbbb
    999eedbbbbd9999999cbbbbbbbcbbbbb
    999eedbbbbd999999cbbbbbbbbcbbbbb
    999eeebbbb9999999cbbbbbbbbcbbbbb
    999eeecccc996999c66bbbb6bbcbb6bb
    99eeeec99c9996996bbbbbbb6bbcb6bb
    66eee6c66c6666666666666666666666
`)
scene.systemMenu.addEntry(() => `Zoom Up and Down`, () => zoomswich2(), img`
    ................................
    ...554..........................
    ..55554.........................
    .5555554........................
    .5555554........................
    ...554..........................
    ...554..........................
    ...554..........................
    ...554..........................
    ...554..........................
    ...554..........................
    ................................
    ................................
    ...44445.44445.44445.445..445...
    ......45.45.45.45.45.45454545...
    .....45..45.45.45.45.45.45.45...
    ....45...45.45.45.45.45....45...
    ...45....45.45.45.45.45....45...
    ...44445.44445.44445.45....45...
    ................................
    ................................
    ..........................455...
    ..........................455...
    ..........................455...
    ..........................455...
    ..........................455...
    ..........................455...
    ........................4555555.
    ........................4555555.
    .........................45555..
    ..........................455...
    ................................
`)
controller.player2.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    if (game_on && p2) {
        if (Player_2.isHittingTile(CollisionDirection.Bottom)) {
            Player_2.vy = -150
        } else if (sprites.readDataBoolean(Player_2, "D")) {
            Player_2.vy = -150
            sprites.setDataBoolean(Player_2, "D", false)
        }
    }
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (zoom3 && game_on) {
        zoom += 1
    }
})
function covertiles () {
    if (levelnublucasM == 4) {
        tileUtil.replaceAllTiles(assets.tile`myTile74`, assets.tile`transparency16`)
        tileUtil.coverAllTiles(assets.tile`myTile73`, img`
            5 1 1 1 1 1 1 4 5 1 1 1 1 1 1 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 5 1 5 5 5 5 5 5 5 
            4 4 4 4 4 4 5 e 4 4 4 4 4 4 5 e 
            5 1 1 1 1 1 1 4 5 1 1 1 1 1 1 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 5 1 5 5 5 5 5 5 5 
            4 4 4 4 4 4 5 e d 4 4 4 4 4 4 e 
            `)
        tileUtil.coverAllTiles(assets.tile`myTile50`, img`
            5 1 1 1 1 1 1 4 5 1 1 1 1 1 1 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 5 1 5 5 5 5 5 5 5 
            4 4 4 4 4 4 5 e 4 4 4 4 4 4 5 e 
            5 1 1 1 1 1 1 4 5 1 1 1 1 1 1 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 5 1 5 5 5 5 5 5 5 
            4 4 4 4 4 4 5 e d 4 4 4 4 4 4 e 
            `)
        tileUtil.coverAllTiles(assets.tile`myTile52`, img`
            5 1 1 1 1 1 1 4 5 1 1 1 1 1 1 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 5 1 5 5 5 5 5 5 5 
            4 4 4 4 4 4 5 e 4 4 4 4 4 4 5 e 
            5 1 1 1 1 1 1 4 5 1 1 1 1 1 1 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 5 1 5 5 5 5 5 5 5 
            4 4 4 4 4 4 5 e d 4 4 4 4 4 4 e 
            `)
        tileUtil.coverAllTiles(assets.tile`myTile44`, img`
            5 1 1 1 1 1 1 4 5 1 1 1 1 1 1 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 5 1 5 5 5 5 5 5 5 
            4 4 4 4 4 4 5 e 4 4 4 4 4 4 5 e 
            5 1 1 1 1 1 1 4 5 1 1 1 1 1 1 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 5 1 5 5 5 5 5 5 5 
            4 4 4 4 4 4 5 e d 4 4 4 4 4 4 e 
            `)
        tileUtil.coverAllTiles(assets.tile`myTile48`, img`
            5 1 1 1 1 1 1 4 5 1 1 1 1 1 1 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 5 1 5 5 5 5 5 5 5 
            4 4 4 4 4 4 5 e 4 4 4 4 4 4 5 e 
            5 1 1 1 1 1 1 4 5 1 1 1 1 1 1 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 4 1 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 5 1 5 5 5 5 5 5 5 
            4 4 4 4 4 4 5 e d 4 4 4 4 4 4 e 
            `)
        tileUtil.coverAllTiles(assets.tile`myTile70`, img`
            4 1 1 1 1 1 1 2 4 1 1 1 1 1 1 2 
            1 4 4 4 4 4 4 2 1 4 4 4 4 4 4 2 
            1 4 4 4 4 4 4 2 1 4 4 4 4 4 4 2 
            1 4 4 4 4 4 4 2 1 4 4 4 4 4 4 2 
            1 4 4 4 4 4 4 2 1 4 4 4 4 4 4 2 
            1 4 4 4 4 4 4 2 1 4 4 4 4 4 4 2 
            1 4 4 4 4 4 4 4 1 4 4 4 4 4 4 4 
            2 2 2 2 2 2 4 e 2 2 2 2 2 2 4 e 
            4 1 1 1 1 1 1 2 4 1 1 1 1 1 1 2 
            1 4 4 4 4 4 4 2 1 4 4 4 4 4 4 2 
            1 4 4 4 4 4 4 2 1 4 4 4 4 4 4 2 
            1 4 4 4 4 4 4 2 1 4 4 4 4 4 4 2 
            1 4 4 4 4 4 4 2 1 4 4 4 4 4 4 2 
            1 4 4 4 4 4 4 2 1 4 4 4 4 4 4 2 
            1 4 4 4 4 4 4 4 1 4 4 4 4 4 4 4 
            2 2 2 2 2 2 4 e d 2 2 2 2 2 2 e 
            `)
        tileUtil.coverAllTiles(assets.tile`myTile58`, img`
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
            1 5 5 5 5 5 5 5 5 5 5 5 5 5 5 4 
            1 5 1 1 5 5 5 5 5 5 5 5 5 5 5 4 
            1 5 1 5 5 5 5 5 5 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 5 5 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 5 5 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 5 5 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 5 5 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 5 5 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 5 5 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 5 5 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 5 5 5 5 5 5 5 5 4 
            1 5 5 5 5 5 5 5 5 5 5 5 5 1 5 4 
            1 5 5 5 5 5 5 5 5 5 5 5 1 1 5 4 
            1 5 5 5 5 5 5 5 5 5 5 5 5 5 5 4 
            4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
            `)
        scene.setBackgroundColor(12)
        scene.setBackgroundImage(img`
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            `)
    } else if (levelnublucasM == 8) {
        tileUtil.coverAllTiles(assets.tile`myTile52`, assets.tile`myTile84`)
        tileUtil.coverAllTiles(assets.tile`myTile54`, img`
            c e e c e e b e e c e e c e e c 
            c e e c e e b 2 2 2 2 e c e e c 
            c e e c e e b 2 2 2 2 e c e e c 
            c e e c e e b 2 2 2 e e c e e c 
            c e e c e e b 2 2 2 2 2 c e e c 
            c e e c e e b e e c e e c e e c 
            c e e c e e b e e c e e c e e c 
            c e e c e e b e e c e e c e e c 
            c e e c e e b e e c e e c e e c 
            c e e c e e b e e c e e c e e c 
            c e e c e e b e e c e e c e e c 
            c e e c e e b e e c e e c e e c 
            c e e c e e b b e c e e c e e c 
            c e e c e c e e e c e e c e e c 
            c e e c e c c b e c e e c e e c 
            c e e c c c c c c c e e c e e c 
            `)
        tileUtil.replaceAllTiles(assets.tile`myTile48`, assets.tile`transparency16`)
        tileUtil.replaceAllTiles(assets.tile`myTile74`, assets.tile`transparency16`)
        tileUtil.replaceAllTiles(assets.tile`myTile73`, assets.tile`transparency16`)
        tileUtil.replaceAllTiles(assets.tile`myTile50`, assets.tile`transparency16`)
        tileUtil.replaceAllTiles(assets.tile`myTile44`, assets.tile`transparency16`)
        scene.setBackgroundImage(img`
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaccaaaaaaaaacaaaaaaaaaaaaaaaaaaaaaaaaaaaaccaaaaaaaaacaaaaaaaaaaaaaaaaaaaaaaaaaaaaccaaaaaaaaacaaaaaaaaaaaaaaaaaaaaaaaaaaaaccaaaaaaaaacaaaaaaaaaaaaaaaaaaaaaaaaa
            acccaaaaaaaaaccaaaaaaaaaaaaaaaaaaaaaaacaacccaaaaaaaaaccaaaaaaaaaaaaaaaaaaaaaaacaacccaaaaaaaaaccaaaaaaaaaaaaaaaaaaaaaaacaacccaaaaaaaaaccaaaaaaaaaaaaaaaaaaaaaaaaa
            aacaaccaaaccaaccaaaaccaaaaaaaaaaaaaaaaccaacaaccaaaccaaccaaaaccaaaaaaaaaaaaaaaaccaacaaccaaaccaaccaaaaccaaaaaaaaaaaaaaaaccaacaaccaaaccaaccaaaaccaaaaaaaaaaaaaaaaaa
            ccccccaacaaccaccaacaccaaaaaaaaaaaaaacc6cccccccaacaaccaccaacaccaaaaaaaaaaaaaacc6cccccccaacaaccaccaacaccaaaaaaaaaaaaaacc6cccccccaacaaccaccaacaccaaaaaaaaaaaaaaccaa
            cccccaaaccacccccaccccaaaaaaaaaaaaacccc66cccccaaaccacccccaccccaaaaaaaaaaaaacccc66cccccaaaccacccccaccccaaaaaaaaaaaaacccc66cccccaaaccacccccaccccaaaaaaaaaaaaaccccaa
            cccccacccccccc6cccccaaacaaaaaacccaaaccc6cccccacccccccc6cccccaaacaaaaaacccaaaccc6cccccacccccccc6cccccaaacaaaaaacccaaaccc6cccccacccccccc6cccccaaacaaaaaacccaaaccca
            ccccccccccccc66cc66cccccaacccaaaccaaacccccccccccccccc66cc66cccccaacccaaaccaaacccccccccccccccc66cc66cccccaacccaaaccaaacccccccccccccccc66cc66cccccaacccaaaccaaaccc
            ccccccccccccc6cccc66cccaac66ccaaccccccccccccccccccccc6cccc66cccaac66ccaaccccccccccccccccccccc6cccc66cccaac66ccaaccccccccccccccccccccc6cccc66cccaac66ccaacccccccc
            ccbccccccccccccccccccccacc666ccaccccccccccbccccccccccccccccccccacc666ccaccccccccccbccccccccccccccccccccacc666ccaccccccccccbccccccccccccccccccccacc666ccacccccccc
            ccbccccccccccccccccccccccb666cccccccccccccbccccccccccccccccccccccb666cccccccccccccbccccccccccccccccccccccb666cccccccccccccbccccccccccccccccccccccb666ccccccccccc
            ccbccccccccccccccccccccccbb66cccccccccccccbccccccccccccccccccccccbb66cccccccccccccbccccccccccccccccccccccbb66cccccccccccccbccccccccccccccccccccccbb66ccccccccccc
            ccbcccccccabbccccccccaaccbbbccccccccccccccbcccccccabbccccccccaaccbbbccccccccccccccbcccccccabbccccccccaaccbbbccccccccccccccbcccccccabbccccccccaaccbbbcccccccccccc
            ccbccccccaabbbccccccccacccbbccccccccccccccbccccccaaabbccccccaaacccbbccccccccccccccbccccccaaabbccccccaaacccbbccccccccccccccbccccccaaabbccccccaaacccbbcccccccccccc
            cbbcccaccaa66bbbcaccccaaccbbcccccccccccccbbcccaccaa66bbbcaccccaaccbbcccccccccccccbbcccaccaa66bbbcaccccaaccbbcccccccccccccbbcccaccaa66bbbcaccccaaccbbcccccccccccc
            cbbccccacca6cabbbaacccaaccbbbccccccccccccbbccccacca6cabbbaacccaaccbbbccccccccccccbbccccacca6cabbbaacccaaccbbbccccccccccccbbccccacca6cabbbaacccaaccbbbccccccccccc
            cbbccccaaaacaa6bbaacccaccccbbccccccccccccbbccccaaaacaa6bbaacccaccccbbccccccccccccbbccccaaaacaa6bbaacccaccccbbccccccccccccbbccccaaaacaa6bbaacccaccccbbccccccccccc
            bbbccccaaaacaa6bbaaccaaccacbbbccacccccccbbbccccaaaacaa6bbaaccaaccacbbbccacccccccbbbccccaaaacaa6bbaaccaaccacbbbccacccccccbbbccccaaaacaa6bbaaccaaccacbbbccaccccccc
            bbbccccaaaacaaabbbaccaaaaa6bbbccaaacccccbbbccccaaaacaaabbbaccaaaaa6bbbccaaacccccbbbccccaaaacaaabbbaccaaaaa6bbbccaaacccccbbbccccaaaacaaabbbaccaaaaa6bbbccaaaccccc
            bbb6cccaaaacaaaabbaccaaaac6bbbacaaccccccbbb6cccaaaacaaaabbaccaaaac6bbbacaaccccccbbb6cccaaaacaaaabbaccaaaac6bbbacaaccccccbbb6cccaaaacaaaabbaccaaaac6bbbacaacccccc
            bbb6cccaaacaaaaabbbccaaaacabbbaaaaccaaccbbb6cccaaacaaaaabbbccaaaacabbbaaaaccaaccbbb6cccaaacaaaaabbbccaaaacabbbaaaaccaaccbbb6cccaaacaaaaabbbccaaaacabbbaaaaccaacc
            bbbccccaaacaaaaaabbccaaaacabbbbaaaacaaacbbbccccaaacaaaaaabbccaaaacabbbbaaaacaaacbbbccccaaacaaaaaabbccaaaacabbbbaaaacaaacbbbccccaaacaaaaaabbccaaaacabbbbaaaacaaac
            bbaccccaaccaaaaaaabbaaaaccabbbbaaaacaaaabbaccccaaccaaaaaaabbaaaaccabbbbaaaacaaaabbaccccaaccaaaaaaabbaaaaccabbbbaaaacaaaabbaccccaaccaaaaaaabbaaaaccabbbbaaaacaaaa
            bbaacccccaaaaaaaaabbbaaacaaabbbaaaacaaaabbaacccccaaaaaaaaabbbaaacaaabbbaaaacaaaabbaacccccaaaaaaaaabbbaaacaaabbbaaaacaaaabbaacccccaaaaaaaaabbbaaacaaabbbaaaacaaaa
            bbaaccccaaaaaaaaaacbbbbccaaabbbaaaacaaabbbaaccccaaaaaaaaaacbbbbccaaabbbaaaacaaabbbaaccccaaaaaaaaaacbbbbccaaabbbaaaacaaabbbaaccccaaaaaaaaaacbbbbccaaabbbaaaacaaab
            bbaacccaaaaaaaaaaaccbbbbaaaabbbbaaacaaabbbaacccaaaaaaaaaaaccbbbbaaaabbbbaaacaaabbbaacccaaaaaaaaaaaccbbbbaaaabbbbaaacaaabbbaacccaaaaaaaaaaaccbbbbaaaabbbbaaacaaab
            bbaacccaaaaaaaaaaaccbbbbbbaabbbbaaacaaabbbaacccaaaaaaaaaaaccbbbbbbaabbbbaaacaaabbbaacccaaaaaaaaaaaccbbbbbbaabbbbaaacaaabbbaacccaaaaaaaaaaaccbbbbbbaabbbbaaacaaab
            baaaaccaaaaaaaaaaccccbbbbbbbbbbbbaaacaabbaaaaccaaaaaaaaaaccccbbbbbbbbbbbbaaacaabbaaaaccaaaaaaaaaaccccbbbbbbbbbbbbaaacaabbaaaaccaaaaaaaaaaccccbbbbbbbbbbbbaaacaab
            baaaacccaaaaaaaaaccaaaaabbbbbbbbbaaacaabbaaaacccaaaaaaaaaccaaaaabbbbbbbbbaaacaabbaaaacccaaaaaaaaaccaaaaabbbbbbbbbaaacaabbaaaacccaaaaaaaaaccaaaaabbbbbbbbbaaacaab
            baaaaccccaaaaaaaaccaaaaaabbbbbbbbaaacabbbaaaaccccaaaaaaaaccaaaaaabbbbbbbbaaacabbbaaaaccccaaaaaaaaccaaaaaabbbbbbbbaaacabbbaaaaccccaaaaaaaaccaaaaaabbbbbbbbaaacabb
            baaaacccccaaaaaacccaaaaaaabbbbbbbaaacbbbbaaaacccccaaaaaacccaaaaaaabbbbbbbaaacbbbbaaaacccccaaaaaacccaaaaaaabbbbbbbaaacbbbbaaaacccccaaaaaacccaaaaaaabbbbbbbaaacbbb
            ccaaaaacccccaaaacccaaaaaaaaabbbbbaaabbbbccaaaaacccccaaaacccaaaaaaaaabbbbbaaabbbbccaaaaacccccaaaacccaaaaaaaaabbbbbaaabbbbccaaaaacccccaaaacccaaaaaaaaabbbbbaaabbbb
            acaaaaacccccccacccaaaaaaaaaabbbbbaabbbbaacaaaaacccccccacccaaaaaaaaaabbbbbaabbbbaacaaaaacccccccacccaaaaaaaaaabbbbbaabbbbaacaaaaacccccccacccaaaaaaaaaabbbbbaabbbba
            acaaaaaaccccccccccaaaaaaaaaabbbbbaabbbaaacaaaaaaccccccccccaaaaaaaaaabbbbbaabbbaaacaaaaaaccccccccccaaaaaaaaaabbbbbaabbbaaacaaaaaaccccccccccaaaaaaaaaabbbbbaabbbaa
            acaaaaaacccccccccaaaaaaaaaaabbbbbaabbaaaacaaaaaacccccccccaaaaaaaaaaabbbbbaabbaaaacaaaaaacccccccccaaaaaaaaaaabbbbbaabbaaaacaaaaaacccccccccaaaaaaaaaaabbbbbaabbaaa
            accaaaaacccccccaaaaaaaaaaaaabbbbbaabbcaaaccaaaaacccccccaaaaaaaaaaaaabbbbbaabbcaaaccaaaaacccccccaaaaaaaaaaaaabbbbbaabbcaaaccaaaaacccccccaaaaaaaaaaaaabbbbbaabbcaa
            aaccaaaaccccccaaaaaaaaaaaaaabbbbbaabbcaaaaccaaaaccccccaaaaaaaaaaaaaabbbbbaabbcaaaaccaaaaccccccaaaaaaaaaaaaaabbbbbaabbcaaaaccaaaaccccccaaaaaaaaaaaaaabbbbbaabbcaa
            aacccaaaccccccaaaaaaaaaaaaaabbbbbabbbccaaacccaaaccccccaaaaaaaaaaaaaabbbbbabbbccaaacccaaaccccccaaaaaaaaaaaaaabbbbbabbbccaaacccaaaccccccaaaaaaaaaaaaaabbbbbabbbcca
            aaaaccccccccccaaaaaaaaaaaaabbbbbbabbbacaaaaaccccccccccaaaaaaaaaaaaabbbbbbabbbacaaaaaccccccccccaaaaaaaaaaaaabbbbbbabbbacaaaaaccccccccccaaaaaaaaaaaaabbbbbbabbbaca
            aaaaccccccccccaaaaaaaaaaaaabbbbbbbbbaacaaaaaccccccccccaaaaaaaaaaaaabbbbbbbbbaacaaaaaccccccccccaaaaaaaaaaaaabbbbbbbbbaacaaaaaccccccccccaaaaaaaaaaaaabbbbbbbbbaaca
            aaaaaaccccccccaaaaaaaaaaaaabbbbbbbbbaaccaaaaaaccccccccaaaaaaaaaaaaabbbbbbbbbaaccaaaaaaccccccccaaaaaaaaaaaaabbbbbbbbbaaccaaaaaaccccccccaaaaaaaaaaaaabbbbbbbbbaacc
            caaaaaaaccccccaaaaaaaaaaaabbbbbbbbbaaaaccaaaaaaaccccccaaaaaaaaaaaabbbbbbbbbaaaaccaaaaaaaccccccaaaaaaaaaaaabbbbbbbbbaaaaccaaaaaaaccccccaaaaaaaaaaaabbbbbbbbbaaaac
            ccaaaaaaacccccaaaaaaaaaaaabbbbbbbbbaaaaaccaaaaaaacccccaaaaaaaaaaaabbbbbbbbbaaaaaccaaaaaaacccccaaaaaaaaaaaabbbbbbbbbaaaaaccaaaaaaacccccaaaaaaaaaaaabbbbbbbbbaaaaa
            ccaaaaaaacccccaaaaaaaaaaaabbbbbbbbaaaaaaccaaaaaaacccccaaaaaaaaaaaabbbbbbbbaaaaaaccaaaaaaacccccaaaaaaaaaaaabbbbbbbbaaaaaaccaaaaaaacccccaaaaaaaaaaaabbbbbbbbaaaaaa
            acaaaaaaacccccaaaaaaaaaaabbbbbbbbbaaaaaaacaaaaaaacccccaaaaaaaaaaabbbbbbbbbaaaaaaacaaaaaaacccccaaaaaaaaaaabbbbbbbbbaaaaaaacaaaaaaacccccaaaaaaaaaaabbbbbbbbbaaaaaa
            acaaaaaaacccccaaaaaaaaaaabbbbbbbbbaaaaaaacaaaaaaacccccaaaaaaaaaaabbbbbbbbbaaaaaaacaaaaaaacccccaaaaaaaaaaabbbbbbbbbaaaaaaacaaaaaaacccccaaaaaaaaaaabbbbbbbbbaaaaaa
            acaaaaaaacccccaaaaaaaaaaabbbbbbbbbaaaaaaacaaaaaaacccccaaaaaaaaaaabbbbbbbbbaaaaaaacaaaaaaacccccaaaaaaaaaaabbbbbbbbbaaaaaaacaaaaaaacccccaaaaaaaaaaabbbbbbbbbaaaaaa
            acaaaaaaacccccaaaaaaaaaaabbbbbbbbbaaaaaaacaaaaaaacccccaaaaaaaaaaabbbbbbbbbaaaaaaacaaaaaaacccccaaaaaaaaaaabbbbbbbbbaaaaaaacaaaaaaacccccaaaaaaaaaaabbbbbbbbbaaaaaa
            accaaaaaacccccaaaaaaaaaaabbbbbbbbaaaaaaaaccaaaaaacccccaaaaaaaaaaabbbbbbbbaaaaaaaaccaaaaaacccccaaaaaaaaaaabbbbbbbbaaaaaaaaccaaaaaacccccaaaaaaaaaaabbbbbbbbaaaaaaa
            accaaaaaacccccaaaaaaaaaaabbbbbbbbaaaaaaaaccaaaaaacccccaaaaaaaaaaabbbbbbbbaaaaaaaaccaaaaaacccccaaaaaaaaaaabbbbbbbbaaaaaaaaccaaaaaacccccaaaaaaaaaaabbbbbbbbaaaaaaa
            cccaaaaaacccccaaaaaaaaaaabbbbbbbbaaaaaaacccaaaaaacccccaaaaaaaaaaabbbbbbbbaaaaaaacccaaaaaacccccaaaaaaaaaaabbbbbbbbaaaaaaacccaaaaaacccccaaaaaaaaaaabbbbbbbbaaaaaaa
            ccaaaaaaacccccaaaaaaaaaaabbbbbbbbaaaaaaaccaaaaaaacccccaaaaaaaaaaabbbbbbbbaaaaaaaccaaaaaaacccccaaaaaaaaaaabbbbbbbbaaaaaaaccaaaaaaacccccaaaaaaaaaaabbbbbbbbaaaaaaa
            ccaaaaaaaccccccaaaaaaaaaabbbbbbbbaaaaaaaccaaaaaaaccccccaaaaaaaaaabbbbbbbbaaaaaaaccaaaaaaaccccccaaaaaaaaaabbbbbbbbaaaaaaaccaaaaaaaccccccaaaaaaaaaabbbbbbbbaaaaaaa
            ccaaaaaaaccccccaaaaaaaaaabbbbbbbbaaaaaaaccaaaaaaaccccccaaaaaaaaaabbbbbbbbaaaaaaaccaaaaaaaccccccaaaaaaaaaabbbbbbbbaaaaaaaccaaaaaaaccccccaaaaaaaaaabbbbbbbbaaaaaaa
            ccaaaaaaaccccccaaaaaaaaaabbbbbbbaaaaaaaaccaaaaaaaccccccaaaaaaaaaabbbbbbbaaaaaaaaccaaaaaaaccccccaaaaaaaaaabbbbbbbaaaaaaaaccaaaaaaaccccccaaaaaaaaaabbbbbbbaaaaaaaa
            caaaaaaaaccccccaaaaaaaaaabbbbbbbaaaaaaaccaaaaaaaaccccccaaaaaaaaaabbbbbbbaaaaaaaccaaaaaaaaccccccaaaaaaaaaabbbbbbbaaaaaaaccaaaaaaaaccccccaaaaaaaaaabbbbbbbaaaaaaac
            caaaaaaaaccccccaaaaaaaaaabbbbbbbaaaaaacccaaaaaaaaccccccaaaaaaaaaabbbbbbbaaaaaacccaaaaaaaaccccccaaaaaaaaaabbbbbbbaaaaaacccaaaaaaaaccccccaaaaaaaaaabbbbbbbaaaaaacc
            caaaaaaaaccccccaaaaaaaaaabbbbbbbaaaaaacccaaaaaaaaccccccaaaaaaaaaabbbbbbbaaaaaacccaaaaaaaaccccccaaaaaaaaaabbbbbbbaaaaaacccaaaaaaaaccccccaaaaaaaaaabbbbbbbaaaaaacc
            aaaaaaaaacccccccaaaaaaaaabbbbbbbaaaaacccaaaaaaaaacccccccaaaaaaaaabbbbbbbaaaaacccaaaaaaaaacccccccaaaaaaaaabbbbbbbaaaaacccaaaaaaaaacccccccaaaaaaaaabbbbbbbaaaaaccc
            aaaaaaaaacccccccaaaaaaaaabbbbbbbaaaaacccaaaaaaaaacccccccaaaaaaaaabbbbbbbaaaaacccaaaaaaaaacccccccaaaaaaaaabbbbbbbaaaaacccaaaaaaaaacccccccaaaaaaaaabbbbbbbaaaaaccc
            aaaaaaaaacccccccaaaaaaaaabbbbbbbaaaaacccaaaaaaaaacccccccaaaaaaaaabbbbbbbaaaaacccaaaaaaaaacccccccaaaaaaaaabbbbbbbaaaaacccaaaaaaaaacccccccaaaaaaaaabbbbbbbaaaaaccc
            aaaaaaaaaccccccccaaaaaaaabbbbbbbaaaaccccaaaaaaaaaccccccccaaaaaaaabbbbbbbaaaaccccaaaaaaaaaccccccccaaaaaaaabbbbbbbaaaaccccaaaaaaaaaccccccccaaaaaaaabbbbbbbaaaacccc
            aaaaaaaaaccccccccaaaaaaaabbbbbbbaaaaccccaaaaaaaaaccccccccaaaaaaaabbbbbbbaaaaccccaaaaaaaaaccccccccaaaaaaaabbbbbbbaaaaccccaaaaaaaaaccccccccaaaaaaaabbbbbbbaaaacccc
            aaaaaaaaaccccccccaaaaaaaabbbbbbbaaaacccaaaaaaaaaaccccccccaaaaaaaabbbbbbbaaaacccaaaaaaaaaaccccccccaaaaaaaabbbbbbbaaaacccaaaaaaaaaaccccccccaaaaaaaabbbbbbbaaaaccca
            aaaaaaaaaaccccccccaaaaaabbbbbbbbaaaacccaaaaaaaaaaaccccccccaaaaaabbbbbbbbaaaacccaaaaaaaaaaaccccccccaaaaaabbbbbbbbaaaacccaaaaaaaaaaaccccccccaaaaaabbbbbbbbaaaaccca
            caaaaaaaaaccccccccaaaaaabbbbbbbbcccccccccaaaaaaaaaccccccccaaaaaabbbbbbbbcccccccccaaaaaaaaaccccccccaaaaaabbbbbbbbcccccccccaaaaaaaaaccccccccaaaaaabbbbbbbbcccccccc
            cccccaaaaaccccccccaaaaaabbbbbbbbbccccccccccccaaaaaccccccccaaaaaabbbbbbbbbccccccccccccaaaaaccccccccaaaaaabbbbbbbbbccccccccccccaaaaaccccccccaaaaaabbbbbbbbbccccccc
            ccccccccaacccccccccaaaccbbbbbbbbbcccccccccccccccaacccccccccaaaccbbbbbbbbbcccccccccccccccaacccccccccaaaccbbbbbbbbbcccccccccccccccaacccccccccaaaccbbbbbbbbbccccccc
            cccccccccccccccccccaccccbbbbbbbbbccccccccccccccccccccccccccaccccbbbbbbbbbccccccccccccccccccccccccccaccccbbbbbbbbbccccccccccccccccccccccccccaccccbbbbbbbbbccccccc
            ccccccccccccccccccccccccbbbbbbbbbbccccccccccccccccccccccccccccccbbbbbbbbbbccccccccccccccccccccccccccccccbbbbbbbbbbccccccccccccccccccccccccccccccbbbbbbbbbbcccccc
            ccccccccccccccccccccccccbbbbbbbbbbccccccccccccccccccccccccccccccbbbbbbbbbbccccccccccccccccccccccccccccccbbbbbbbbbbccccccccccccccccccccccccccccccbbbbbbbbbbcccccc
            cccccccccccccccccccccccbbbbbbbbbbbcccccccccccccccccccccccccccccbbbbbbbbbbbcccccccccccccccccccccccccccccbbbbbbbbbbbcccccccccccccccccccccccccccccbbbbbbbbbbbcccccc
            cccccccccccccccccccccccbbbbbbbbbbbbccccccccccccccccccccccccccccbbbbbbbbbbbbccccccccccccccccccccccccccccbbbbbbbbbbbbccccccccccccccccccccccccccccbbbbbbbbbbbbccccc
            cccccccccccccccccccccccbbbbbbbbbbbbccccccccccccccccccccccccccccbbbbbbbbbbbbccccccccccccccccccccccccccccbbbbbbbbbbbbccccccccccccccccccccccccccccbbbbbbbbbbbbccccc
            cccccccccccccccccccccccbbbbbbbbbbbbccccccccccccccccccccccccccccbbbbbbbbbbbbccccccccccccccccccccccccccccbbbbbbbbbbbbccccccccccccccccccccccccccccbbbbbbbbbbbbccccc
            cccccccccccccccccccccccbbbbbbbbbbbbccccccccccccccccccccccccccccbbbbbbbbbbbbccccccccccccccccccccccccccccbbbbbbbbbbbbccccccccccccccccccccccccccccbbbbbbbbbbbbccccc
            cccccccccccccccccccaaaaaaaaaabbbbbbccccccccccccccccccccccccaaaaaaaaaabbbbbbccccccccccccccccccccccccaaaaaaaaaabbbbbbccccccccccccccccccccccccaaaaaaaaaabbbbbbccccc
            ccccccccccccccaaaaaaaaaaaaaaaaaaaabcccccccccccccccccccaaaaaaaaaaaaaaaaaaaabcccccccccccccccccccaaaaaaaaaaaaaaaaaaaabcccccccccccccccccccaaaaaaaaaaaaaaaaaaaabccccc
            cccccccccccaaaaaaaaaaaaaaaaaaaaaaaaacccccccccccccccaaaaaaaaaaaaaaaaaaaaaaaaacccccccccccccccaaaaaaaaaaaaaaaaaaaaaaaaacccccccccccccccaaaaaaaaaaaaaaaaaaaaaaaaacccc
            ccccccccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaccccccccccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaccccccccccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaccccccccccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacc
            cccccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacccccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacccccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacccccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            `)
        scroller.scrollBackgroundWithCamera(scroller.CameraScrollMode.BothDirections)
        scroller.scrollBackgroundWithSpeed(0, 0)
    } else {
        tileUtil.replaceAllTiles(assets.tile`myTile74`, assets.tile`transparency16`)
        tileUtil.replaceAllTiles(assets.tile`myTile48`, assets.tile`transparency16`)
        tileUtil.replaceAllTiles(assets.tile`myTile50`, assets.tile`transparency16`)
        tileUtil.replaceAllTiles(assets.tile`myTile73`, assets.tile`transparency16`)
        tileUtil.replaceAllTiles(assets.tile`myTile52`, assets.tile`transparency16`)
        tileUtil.replaceAllTiles(assets.tile`myTile44`, assets.tile`transparency16`)
        tileUtil.replaceAllTiles(assets.tile`myTile88`, assets.tile`transparency16`)
        tileUtil.replaceAllTiles(assets.tile`myTile96`, assets.tile`transparency16`)
        tileUtil.replaceAllTiles(assets.tile`myTile101`, assets.tile`myTile28`)
        scene.setBackgroundColor(9)
    }
    if (levelnublucasM == 9) {
        scene.setBackgroundImage(img`
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaccaaaaaaaaacaaaaaaaaaaaaaaaaaaaaaaaaaaaaccaaaaaaaaacaaaaaaaaaaaaaaaaaaaaaaaaaaaaccaaaaaaaaacaaaaaaaaaaaaaaaaaaaaaaaaaaaaccaaaaaaaaacaaaaaaaaaaaaaaaaaaaaaaaaa
            acccaaaaaaaaaccaaaaaaaaaaaaaaaaaaaaaaacaacccaaaaaaaaaccaaaaaaaaaaaaaaaaaaaaaaacaacccaaaaaaaaaccaaaaaaaaaaaaaaaaaaaaaaacaacccaaaaaaaaaccaaaaaaaaaaaaaaaaaaaaaaaaa
            aacaaccaaaccaaccaaaaccaaaaaaaaaaaaaaaaccaacaaccaaaccaaccaaaaccaaaaaaaaaaaaaaaaccaacaaccaaaccaaccaaaaccaaaaaaaaaaaaaaaaccaacaaccaaaccaaccaaaaccaaaaaaaaaaaaaaaaaa
            ccccccaacaaccaccaacaccaaaaaaaaaaaaaacc6cccccccaacaaccaccaacaccaaaaaaaaaaaaaacc6cccccccaacaaccaccaacaccaaaaaaaaaaaaaacc6cccccccaacaaccaccaacaccaaaaaaaaaaaaaaccaa
            cccccaaaccacccccaccccaaaaaaaaaaaaacccc66cccccaaaccacccccaccccaaaaaaaaaaaaacccc66cccccaaaccacccccaccccaaaaaaaaaaaaacccc66cccccaaaccacccccaccccaaaaaaaaaaaaaccccaa
            cccccacccccccc6cccccaaacaaaaaacccaaaccc6cccccacccccccc6cccccaaacaaaaaacccaaaccc6cccccacccccccc6cccccaaacaaaaaacccaaaccc6cccccacccccccc6cccccaaacaaaaaacccaaaccca
            ccccccccccccc66cc66cccccaacccaaaccaaacccccccccccccccc66cc66cccccaacccaaaccaaacccccccccccccccc66cc66cccccaacccaaaccaaacccccccccccccccc66cc66cccccaacccaaaccaaaccc
            ccccccccccccc6cccc66cccaac66ccaaccccccccccccccccccccc6cccc66cccaac66ccaaccccccccccccccccccccc6cccc66cccaac66ccaaccccccccccccccccccccc6cccc66cccaac66ccaacccccccc
            ccbccccccccccccccccccccacc666ccaccccccccccbccccccccccccccccccccacc666ccaccccccccccbccccccccccccccccccccacc666ccaccccccccccbccccccccccccccccccccacc666ccacccccccc
            ccbccccccccccccccccccccccb666cccccccccccccbccccccccccccccccccccccb666cccccccccccccbccccccccccccccccccccccb666cccccccccccccbccccccccccccccccccccccb666ccccccccccc
            ccbccccccccccccccccccccccbb66cccccccccccccbccccccccccccccccccccccbb66cccccccccccccbccccccccccccccccccccccbb66cccccccccccccbccccccccccccccccccccccbb66ccccccccccc
            ccbcccccccabbccccccccaaccbbbccccccccccccccbcccccccabbccccccccaaccbbbccccccccccccccbcccccccabbccccccccaaccbbbccccccccccccccbcccccccabbccccccccaaccbbbcccccccccccc
            ccbccccccaabbbccccccccacccbbccccccccccccccbccccccaaabbccccccaaacccbbccccccccccccccbccccccaaabbccccccaaacccbbccccccccccccccbccccccaaabbccccccaaacccbbcccccccccccc
            cbbcccaccaa66bbbcaccccaaccbbcccccccccccccbbcccaccaa66bbbcaccccaaccbbcccccccccccccbbcccaccaa66bbbcaccccaaccbbcccccccccccccbbcccaccaa66bbbcaccccaaccbbcccccccccccc
            cbbccccacca6cabbbaacccaaccbbbccccccccccccbbccccacca6cabbbaacccaaccbbbccccccccccccbbccccacca6cabbbaacccaaccbbbccccccccccccbbccccacca6cabbbaacccaaccbbbccccccccccc
            cbbccccaaaacaa6bbaacccaccccbbccccccccccccbbccccaaaacaa6bbaacccaccccbbccccccccccccbbccccaaaacaa6bbaacccaccccbbccccccccccccbbccccaaaacaa6bbaacccaccccbbccccccccccc
            bbbccccaaaacaa6bbaaccaaccacbbbccacccccccbbbccccaaaacaa6bbaaccaaccacbbbccacccccccbbbccccaaaacaa6bbaaccaaccacbbbccacccccccbbbccccaaaacaa6bbaaccaaccacbbbccaccccccc
            bbbccccaaaacaaabbbaccaaaaa6bbbccaaacccccbbbccccaaaacaaabbbaccaaaaa6bbbccaaacccccbbbccccaaaacaaabbbaccaaaaa6bbbccaaacccccbbbccccaaaacaaabbbaccaaaaa6bbbccaaaccccc
            bbb6cccaaaacaaaabbaccaaaac6bbbacaaccccccbbb6cccaaaacaaaabbaccaaaac6bbbacaaccccccbbb6cccaaaacaaaabbaccaaaac6bbbacaaccccccbbb6cccaaaacaaaabbaccaaaac6bbbacaacccccc
            bbb6cccaaacaaaaabbbccaaaacabbbaaaaccaaccbbb6cccaaacaaaaabbbccaaaacabbbaaaaccaaccbbb6cccaaacaaaaabbbccaaaacabbbaaaaccaaccbbb6cccaaacaaaaabbbccaaaacabbbaaaaccaacc
            bbbccccaaacaaaaaabbccaaaacabbbbaaaacaaacbbbccccaaacaaaaaabbccaaaacabbbbaaaacaaacbbbccccaaacaaaaaabbccaaaacabbbbaaaacaaacbbbccccaaacaaaaaabbccaaaacabbbbaaaacaaac
            bbaccccaaccaaaaaaabbaaaaccabbbbaaaacaaaabbaccccaaccaaaaaaabbaaaaccabbbbaaaacaaaabbaccccaaccaaaaaaabbaaaaccabbbbaaaacaaaabbaccccaaccaaaaaaabbaaaaccabbbbaaaacaaaa
            bbaacccccaaaaaaaaabbbaaacaaabbbaaaacaaaabbaacccccaaaaaaaaabbbaaacaaabbbaaaacaaaabbaacccccaaaaaaaaabbbaaacaaabbbaaaacaaaabbaacccccaaaaaaaaabbbaaacaaabbbaaaacaaaa
            bbaaccccaaaaaaaaaacbbbbccaaabbbaaaacaaabbbaaccccaaaaaaaaaacbbbbccaaabbbaaaacaaabbbaaccccaaaaaaaaaacbbbbccaaabbbaaaacaaabbbaaccccaaaaaaaaaacbbbbccaaabbbaaaacaaab
            bbaacccaaaaaaaaaaaccbbbbaaaabbbbaaacaaabbbaacccaaaaaaaaaaaccbbbbaaaabbbbaaacaaabbbaacccaaaaaaaaaaaccbbbbaaaabbbbaaacaaabbbaacccaaaaaaaaaaaccbbbbaaaabbbbaaacaaab
            bbaacccaaaaaaaaaaaccbbbbbbaabbbbaaacaaabbbaacccaaaaaaaaaaaccbbbbbbaabbbbaaacaaabbbaacccaaaaaaaaaaaccbbbbbbaabbbbaaacaaabbbaacccaaaaaaaaaaaccbbbbbbaabbbbaaacaaab
            baaaaccaaaaaaaaaaccccbbbbbbbbbbbbaaacaabbaaaaccaaaaaaaaaaccccbbbbbbbbbbbbaaacaabbaaaaccaaaaaaaaaaccccbbbbbbbbbbbbaaacaabbaaaaccaaaaaaaaaaccccbbbbbbbbbbbbaaacaab
            baaaacccaaaaaaaaaccaaaaabbbbbbbbbaaacaabbaaaacccaaaaaaaaaccaaaaabbbbbbbbbaaacaabbaaaacccaaaaaaaaaccaaaaabbbbbbbbbaaacaabbaaaacccaaaaaaaaaccaaaaabbbbbbbbbaaacaab
            baaaaccccaaaaaaaaccaaaaaabbbbbbbbaaacabbbaaaaccccaaaaaaaaccaaaaaabbbbbbbbaaacabbbaaaaccccaaaaaaaaccaaaaaabbbbbbbbaaacabbbaaaaccccaaaaaaaaccaaaaaabbbbbbbbaaacabb
            baaaacccccaaaaaacccaaaaaaabbbbbbbaaacbbbbaaaacccccaaaaaacccaaaaaaabbbbbbbaaacbbbbaaaacccccaaaaaacccaaaaaaabbbbbbbaaacbbbbaaaacccccaaaaaacccaaaaaaabbbbbbbaaacbbb
            ccaaaaacccccaaaacccaaaaaaaaabbbbbaaabbbbccaaaaacccccaaaacccaaaaaaaaabbbbbaaabbbbccaaaaacccccaaaacccaaaaaaaaabbbbbaaabbbbccaaaaacccccaaaacccaaaaaaaaabbbbbaaabbbb
            acaaaaacccccccacccaaaaaaaaaabbbbbaabbbbaacaaaaacccccccacccaaaaaaaaaabbbbbaabbbbaacaaaaacccccccacccaaaaaaaaaabbbbbaabbbbaacaaaaacccccccacccaaaaaaaaaabbbbbaabbbba
            acaaaaaaccccccccccaaaaaaaaaabbbbbaabbbaaacaaaaaaccccccccccaaaaaaaaaabbbbbaabbbaaacaaaaaaccccccccccaaaaaaaaaabbbbbaabbbaaacaaaaaaccccccccccaaaaaaaaaabbbbbaabbbaa
            acaaaaaacccccccccaaaaaaaaaaabbbbbaabbaaaacaaaaaacccccccccaaaaaaaaaaabbbbbaabbaaaacaaaaaacccccccccaaaaaaaaaaabbbbbaabbaaaacaaaaaacccccccccaaaaaaaaaaabbbbbaabbaaa
            accaaaaacccccccaaaaaaaaaaaaabbbbbaabbcaaaccaaaaacccccccaaaaaaaaaaaaabbbbbaabbcaaaccaaaaacccccccaaaaaaaaaaaaabbbbbaabbcaaaccaaaaacccccccaaaaaaaaaaaaabbbbbaabbcaa
            aaccaaaaccccccaaaaaaaaaaaaaabbbbbaabbcaaaaccaaaaccccccaaaaaaaaaaaaaabbbbbaabbcaaaaccaaaaccccccaaaaaaaaaaaaaabbbbbaabbcaaaaccaaaaccccccaaaaaaaaaaaaaabbbbbaabbcaa
            aacccaaaccccccaaaaaaaaaaaaaabbbbbabbbccaaacccaaaccccccaaaaaaaaaaaaaabbbbbabbbccaaacccaaaccccccaaaaaaaaaaaaaabbbbbabbbccaaacccaaaccccccaaaaaaaaaaaaaabbbbbabbbcca
            aaaaccccccccccaaaaaaaaaaaaabbbbbbabbbacaaaaaccccccccccaaaaaaaaaaaaabbbbbbabbbacaaaaaccccccccccaaaaaaaaaaaaabbbbbbabbbacaaaaaccccccccccaaaaaaaaaaaaabbbbbbabbbaca
            aaaaccccccccccaaaaaaaaaaaaabbbbbbbbbaacaaaaaccccccccccaaaaaaaaaaaaabbbbbbbbbaacaaaaaccccccccccaaaaaaaaaaaaabbbbbbbbbaacaaaaaccccccccccaaaaaaaaaaaaabbbbbbbbbaaca
            aaaaaaccccccccaaaaaaaaaaaaabbbbbbbbbaaccaaaaaaccccccccaaaaaaaaaaaaabbbbbbbbbaaccaaaaaaccccccccaaaaaaaaaaaaabbbbbbbbbaaccaaaaaaccccccccaaaaaaaaaaaaabbbbbbbbbaacc
            caaaaaaaccccccaaaaaaaaaaaabbbbbbbbbaaaaccaaaaaaaccccccaaaaaaaaaaaabbbbbbbbbaaaaccaaaaaaaccccccaaaaaaaaaaaabbbbbbbbbaaaaccaaaaaaaccccccaaaaaaaaaaaabbbbbbbbbaaaac
            ccaaaaaaacccccaaaaaaaaaaaabbbbbbbbbaaaaaccaaaaaaacccccaaaaaaaaaaaabbbbbbbbbaaaaaccaaaaaaacccccaaaaaaaaaaaabbbbbbbbbaaaaaccaaaaaaacccccaaaaaaaaaaaabbbbbbbbbaaaaa
            ccaaaaaaacccccaaaaaaaaaaaabbbbbbbbaaaaaaccaaaaaaacccccaaaaaaaaaaaabbbbbbbbaaaaaaccaaaaaaacccccaaaaaaaaaaaabbbbbbbbaaaaaaccaaaaaaacccccaaaaaaaaaaaabbbbbbbbaaaaaa
            acaaaaaaacccccaaaaaaaaaaabbbbbbbbbaaaaaaacaaaaaaacccccaaaaaaaaaaabbbbbbbbbaaaaaaacaaaaaaacccccaaaaaaaaaaabbbbbbbbbaaaaaaacaaaaaaacccccaaaaaaaaaaabbbbbbbbbaaaaaa
            acaaaaaaacccccaaaaaaaaaaabbbbbbbbbaaaaaaacaaaaaaacccccaaaaaaaaaaabbbbbbbbbaaaaaaacaaaaaaacccccaaaaaaaaaaabbbbbbbbbaaaaaaacaaaaaaacccccaaaaaaaaaaabbbbbbbbbaaaaaa
            acaaaaaaacccccaaaaaaaaaaabbbbbbbbbaaaaaaacaaaaaaacccccaaaaaaaaaaabbbbbbbbbaaaaaaacaaaaaaacccccaaaaaaaaaaabbbbbbbbbaaaaaaacaaaaaaacccccaaaaaaaaaaabbbbbbbbbaaaaaa
            acaaaaaaacccccaaaaaaaaaaabbbbbbbbbaaaaaaacaaaaaaacccccaaaaaaaaaaabbbbbbbbbaaaaaaacaaaaaaacccccaaaaaaaaaaabbbbbbbbbaaaaaaacaaaaaaacccccaaaaaaaaaaabbbbbbbbbaaaaaa
            accaaaaaacccccaaaaaaaaaaabbbbbbbbaaaaaaaaccaaaaaacccccaaaaaaaaaaabbbbbbbbaaaaaaaaccaaaaaacccccaaaaaaaaaaabbbbbbbbaaaaaaaaccaaaaaacccccaaaaaaaaaaabbbbbbbbaaaaaaa
            accaaaaaacccccaaaaaaaaaaabbbbbbbbaaaaaaaaccaaaaaacccccaaaaaaaaaaabbbbbbbbaaaaaaaaccaaaaaacccccaaaaaaaaaaabbbbbbbbaaaaaaaaccaaaaaacccccaaaaaaaaaaabbbbbbbbaaaaaaa
            cccaaaaaacccccaaaaaaaaaaabbbbbbbbaaaaaaacccaaaaaacccccaaaaaaaaaaabbbbbbbbaaaaaaacccaaaaaacccccaaaaaaaaaaabbbbbbbbaaaaaaacccaaaaaacccccaaaaaaaaaaabbbbbbbbaaaaaaa
            ccaaaaaaacccccaaaaaaaaaaabbbbbbbbaaaaaaaccaaaaaaacccccaaaaaaaaaaabbbbbbbbaaaaaaaccaaaaaaacccccaaaaaaaaaaabbbbbbbbaaaaaaaccaaaaaaacccccaaaaaaaaaaabbbbbbbbaaaaaaa
            ccaaaaaaaccccccaaaaaaaaaabbbbbbbbaaaaaaaccaaaaaaaccccccaaaaaaaaaabbbbbbbbaaaaaaaccaaaaaaaccccccaaaaaaaaaabbbbbbbbaaaaaaaccaaaaaaaccccccaaaaaaaaaabbbbbbbbaaaaaaa
            ccaaaaaaaccccccaaaaaaaaaabbbbbbbbaaaaaaaccaaaaaaaccccccaaaaaaaaaabbbbbbbbaaaaaaaccaaaaaaaccccccaaaaaaaaaabbbbbbbbaaaaaaaccaaaaaaaccccccaaaaaaaaaabbbbbbbbaaaaaaa
            ccaaaaaaaccccccaaaaaaaaaabbbbbbbaaaaaaaaccaaaaaaaccccccaaaaaaaaaabbbbbbbaaaaaaaaccaaaaaaaccccccaaaaaaaaaabbbbbbbaaaaaaaaccaaaaaaaccccccaaaaaaaaaabbbbbbbaaaaaaaa
            caaaaaaaaccccccaaaaaaaaaabbbbbbbaaaaaaaccaaaaaaaaccccccaaaaaaaaaabbbbbbbaaaaaaaccaaaaaaaaccccccaaaaaaaaaabbbbbbbaaaaaaaccaaaaaaaaccccccaaaaaaaaaabbbbbbbaaaaaaac
            caaaaaaaaccccccaaaaaaaaaabbbbbbbaaaaaacccaaaaaaaaccccccaaaaaaaaaabbbbbbbaaaaaacccaaaaaaaaccccccaaaaaaaaaabbbbbbbaaaaaacccaaaaaaaaccccccaaaaaaaaaabbbbbbbaaaaaacc
            caaaaaaaaccccccaaaaaaaaaabbbbbbbaaaaaacccaaaaaaaaccccccaaaaaaaaaabbbbbbbaaaaaacccaaaaaaaaccccccaaaaaaaaaabbbbbbbaaaaaacccaaaaaaaaccccccaaaaaaaaaabbbbbbbaaaaaacc
            aaaaaaaaacccccccaaaaaaaaabbbbbbbaaaaacccaaaaaaaaacccccccaaaaaaaaabbbbbbbaaaaacccaaaaaaaaacccccccaaaaaaaaabbbbbbbaaaaacccaaaaaaaaacccccccaaaaaaaaabbbbbbbaaaaaccc
            aaaaaaaaacccccccaaaaaaaaabbbbbbbaaaaacccaaaaaaaaacccccccaaaaaaaaabbbbbbbaaaaacccaaaaaaaaacccccccaaaaaaaaabbbbbbbaaaaacccaaaaaaaaacccccccaaaaaaaaabbbbbbbaaaaaccc
            aaaaaaaaacccccccaaaaaaaaabbbbbbbaaaaacccaaaaaaaaacccccccaaaaaaaaabbbbbbbaaaaacccaaaaaaaaacccccccaaaaaaaaabbbbbbbaaaaacccaaaaaaaaacccccccaaaaaaaaabbbbbbbaaaaaccc
            aaaaaaaaaccccccccaaaaaaaabbbbbbbaaaaccccaaaaaaaaaccccccccaaaaaaaabbbbbbbaaaaccccaaaaaaaaaccccccccaaaaaaaabbbbbbbaaaaccccaaaaaaaaaccccccccaaaaaaaabbbbbbbaaaacccc
            aaaaaaaaaccccccccaaaaaaaabbbbbbbaaaaccccaaaaaaaaaccccccccaaaaaaaabbbbbbbaaaaccccaaaaaaaaaccccccccaaaaaaaabbbbbbbaaaaccccaaaaaaaaaccccccccaaaaaaaabbbbbbbaaaacccc
            aaaaaaaaaccccccccaaaaaaaabbbbbbbaaaacccaaaaaaaaaaccccccccaaaaaaaabbbbbbbaaaacccaaaaaaaaaaccccccccaaaaaaaabbbbbbbaaaacccaaaaaaaaaaccccccccaaaaaaaabbbbbbbaaaaccca
            aaaaaaaaaaccccccccaaaaaabbbbbbbbaaaacccaaaaaaaaaaaccccccccaaaaaabbbbbbbbaaaacccaaaaaaaaaaaccccccccaaaaaabbbbbbbbaaaacccaaaaaaaaaaaccccccccaaaaaabbbbbbbbaaaaccca
            caaaaaaaaaccccccccaaaaaabbbbbbbbcccccccccaaaaaaaaaccccccccaaaaaabbbbbbbbcccccccccaaaaaaaaaccccccccaaaaaabbbbbbbbcccccccccaaaaaaaaaccccccccaaaaaabbbbbbbbcccccccc
            cccccaaaaaccccccccaaaaaabbbbbbbbbccccccccccccaaaaaccccccccaaaaaabbbbbbbbbccccccccccccaaaaaccccccccaaaaaabbbbbbbbbccccccccccccaaaaaccccccccaaaaaabbbbbbbbbccccccc
            ccccccccaacccccccccaaaccbbbbbbbbbcccccccccccccccaacccccccccaaaccbbbbbbbbbcccccccccccccccaacccccccccaaaccbbbbbbbbbcccccccccccccccaacccccccccaaaccbbbbbbbbbccccccc
            cccccccccccccccccccaccccbbbbbbbbbccccccccccccccccccccccccccaccccbbbbbbbbbccccccccccccccccccccccccccaccccbbbbbbbbbccccccccccccccccccccccccccaccccbbbbbbbbbccccccc
            ccccccccccccccccccccccccbbbbbbbbbbccccccccccccccccccccccccccccccbbbbbbbbbbccccccccccccccccccccccccccccccbbbbbbbbbbccccccccccccccccccccccccccccccbbbbbbbbbbcccccc
            ccccccccccccccccccccccccbbbbbbbbbbccccccccccccccccccccccccccccccbbbbbbbbbbccccccccccccccccccccccccccccccbbbbbbbbbbccccccccccccccccccccccccccccccbbbbbbbbbbcccccc
            cccccccccccccccccccccccbbbbbbbbbbbcccccccccccccccccccccccccccccbbbbbbbbbbbcccccccccccccccccccccccccccccbbbbbbbbbbbcccccccccccccccccccccccccccccbbbbbbbbbbbcccccc
            cccccccccccccccccccccccbbbbbbbbbbbbccccccccccccccccccccccccccccbbbbbbbbbbbbccccccccccccccccccccccccccccbbbbbbbbbbbbccccccccccccccccccccccccccccbbbbbbbbbbbbccccc
            cccccccccccccccccccccccbbbbbbbbbbbbccccccccccccccccccccccccccccbbbbbbbbbbbbccccccccccccccccccccccccccccbbbbbbbbbbbbccccccccccccccccccccccccccccbbbbbbbbbbbbccccc
            cccccccccccccccccccccccbbbbbbbbbbbbccccccccccccccccccccccccccccbbbbbbbbbbbbccccccccccccccccccccccccccccbbbbbbbbbbbbccccccccccccccccccccccccccccbbbbbbbbbbbbccccc
            cccccccccccccccccccccccbbbbbbbbbbbbccccccccccccccccccccccccccccbbbbbbbbbbbbccccccccccccccccccccccccccccbbbbbbbbbbbbccccccccccccccccccccccccccccbbbbbbbbbbbbccccc
            cccccccccccccccccccaaaaaaaaaabbbbbbccccccccccccccccccccccccaaaaaaaaaabbbbbbccccccccccccccccccccccccaaaaaaaaaabbbbbbccccccccccccccccccccccccaaaaaaaaaabbbbbbccccc
            ccccccccccccccaaaaaaaaaaaaaaaaaaaabcccccccccccccccccccaaaaaaaaaaaaaaaaaaaabcccccccccccccccccccaaaaaaaaaaaaaaaaaaaabcccccccccccccccccccaaaaaaaaaaaaaaaaaaaabccccc
            cccccccccccaaaaaaaaaaaaaaaaaaaaaaaaacccccccccccccccaaaaaaaaaaaaaaaaaaaaaaaaacccccccccccccccaaaaaaaaaaaaaaaaaaaaaaaaacccccccccccccccaaaaaaaaaaaaaaaaaaaaaaaaacccc
            ccccccccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaccccccccccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaccccccccccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaccccccccccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacc
            cccccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacccccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacccccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacccccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            `)
        scroller.scrollBackgroundWithCamera(scroller.CameraScrollMode.BothDirections)
        scroller.scrollBackgroundWithSpeed(0, 0)
    }
    if (levelnublucasM == 10) {
        scene.setBackgroundImage(img`
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            `)
        scroller.scrollBackgroundWithCamera(scroller.CameraScrollMode.BothDirections)
        scroller.scrollBackgroundWithSpeed(0, 0)
    }
}
controller.player1.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Pressed, function () {
    if (!(spriteutils.isDestroyed(Player_1))) {
        if (game_on) {
            sprites.setDataBoolean(Player_1, "right", true)
            sprites.setDataBoolean(Player_1, "left", false)
        }
    }
})
function NPCTalking (mySprite: Sprite) {
    for (let value of spriteutils.getSpritesWithin(SpriteKind.NPCTalk, 50, mySprite)) {
        if (sprites.readDataBoolean(value, "Said something this level")) {
            scene.cameraFollowSprite(value)
            zoom2 = true
            zoom = 1
            value.sayText(sprites.readDataString(value, "sayshi"), sprites.readDataNumber(value, "speed"), true)
            pause(sprites.readDataNumber(value, "speed"))
            value.sayText(sprites.readDataString(value, "says1"), sprites.readDataNumber(value, "speed"), true)
            pause(sprites.readDataNumber(value, "speed"))
            value.sayText(sprites.readDataString(value, "says2"), sprites.readDataNumber(value, "speed"), true)
            pause(sprites.readDataNumber(value, "speed"))
            value.sayText(sprites.readDataString(value, "says3"), sprites.readDataNumber(value, "speed"), true)
            pause(sprites.readDataNumber(value, "speed"))
            zoom = 1
            zoom2 = false
            sprites.setDataBoolean(value, "Said something this level", false)
            scene.cameraFollowSprite(mySprite)
        }
    }
}
function doSomething (mySprite: Sprite) {
    for (let value of spriteutils.getSpritesWithin(SpriteKind.Enemy, 50, mySprite)) {
        if (mySprite.x > value.x) {
            sprites.setDataBoolean(mySprite, "right", false)
            sprites.setDataBoolean(mySprite, "left", true)
        } else if (mySprite.x < value.x) {
            sprites.setDataBoolean(mySprite, "left", false)
            sprites.setDataBoolean(mySprite, "right", true)
        }
        shoot(mySprite)
    }
}
function shoot (mySprite: Sprite) {
    if (sprites.readDataBoolean(mySprite, "left")) {
        if (sprites.readDataString(mySprite, "cat") == "Captain Cat") {
            projectile = sprites.createProjectileFromSprite(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . b b . b . . . . . . . . . b . 
                b b b b b b b b b b b b b b b b 
                . b b . b . . . . . . . . . b . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, mySprite, -130, 0)
            projectile.setFlag(SpriteFlag.AutoDestroy, false)
        }
        if (sprites.readDataString(mySprite, "cat") == "Coco") {
            projectile = sprites.createProjectileFromSprite(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, mySprite, -130, 0)
            projectile.setFlag(SpriteFlag.AutoDestroy, false)
            animation.runImageAnimation(
            projectile,
            [img`
                . 7 7 7 7 7 2 2 2 2 2 2 2 . . . 
                7 . . . . 2 7 . . . . . . 2 . . 
                7 . . . . 2 7 . . . . . . 2 . . 
                7 . . . . 2 7 . . . . . . 2 . . 
                7 . . . . 2 7 . . . . . . 2 . . 
                7 . . . . 2 3 3 3 3 3 3 3 2 . . 
                . 5 5 5 5 2 . . . . . . . 2 . . 
                . 5 . . . 2 . . . . . . . 2 . . 
                . 5 . . . 5 2 2 2 2 2 2 2 3 . . 
                . 5 . . . 5 . . . . . . . 3 . . 
                . 5 5 5 5 5 . . . . . . . 3 . . 
                . . . . . 3 . . . . . . . 3 . . 
                . . . . . 3 . . . . . . . 3 . . 
                . . . . . . 3 3 3 3 3 3 3 . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `,img`
                . . . . . . . . 2 2 2 2 2 2 2 . 
                . 7 7 7 7 7 7 2 . . . . . . . 2 
                7 . . . . . . 2 7 . . . . . . 2 
                7 . . . . . . 2 7 . . . . . . 2 
                7 . . . . . . 2 7 . . . . . . 2 
                7 . . . . . 3 2 7 3 3 3 3 . . 2 
                7 . . . . 5 5 5 5 5 5 5 . 3 . 2 
                7 . . . 5 3 . 2 7 . . . 5 3 . 2 
                7 . . . 5 3 . . 2 2 2 2 5 2 2 . 
                . 7 7 7 5 7 7 7 . . . . 5 3 . . 
                . . . . 5 3 . . . . . . 5 3 . . 
                . . . . 5 3 . . . . . . 5 3 . . 
                . . . . 5 3 . . . . . . 5 3 . . 
                . . . . 5 . 3 3 3 3 3 3 5 . . . 
                . . . . . 5 5 5 5 5 5 5 . . . . 
                . . . . . . . . . . . . . . . . 
                `,img`
                . . . . 7 7 7 7 7 7 7 . . . . . 
                . . 7 7 5 5 5 . . . . 7 7 . . . 
                . 7 . . . . . 5 . . . . . 7 . . 
                . 7 . . . . 2 2 2 2 2 2 2 7 . . 
                7 5 . . . 2 . 5 . . . . . 2 7 . 
                7 5 . 3 2 3 3 3 3 3 . . . . 7 . 
                7 5 3 . 2 . . 5 . . 3 . . . 7 . 
                7 . 3 5 2 5 5 . . . 3 . . . 7 . 
                7 . 3 . 2 . . . . . 3 . . . 7 . 
                7 . 3 . 2 . . . . . 3 . . . 7 . 
                7 . 3 . 2 . . . . . 3 . . . 7 . 
                . 7 3 . 2 . . . . . 3 . . 7 2 . 
                . 7 3 . . 2 . . . . 3 . . 7 . . 
                . . 7 7 3 3 2 2 2 2 2 7 7 . . . 
                . . . . 7 7 7 7 7 7 7 . . . . . 
                . . . . . . . . . . . . . . . . 
                `,img`
                . . . 2 2 2 2 2 . . . . . . . . 
                . . 2 . . . . . 2 . . . . . . . 
                . . 2 . . . . . 2 . . . . . . . 
                . . 2 . . . . 5 5 5 5 5 5 5 . . 
                . . 3 3 3 3 3 3 3 . . . . . 5 . 
                . 3 2 . . . 5 . 2 3 . . . . 5 . 
                . 3 . 2 2 2 5 2 . 3 . . . . 5 . 
                . 3 . . . . 5 . . 3 . . . . 5 . 
                . 3 . . . . 5 . . 3 . . . . 5 . 
                . 3 . . . . 5 . . 3 . . . . 5 . 
                . 3 . . . . 5 . . 3 7 7 7 7 5 . 
                . 3 . . . . . 5 5 3 5 5 5 5 . . 
                . . 3 3 3 3 3 3 3 7 . . . 7 . . 
                . . . . . . . . . 7 . . . 7 . . 
                . . . . . . . . . 7 7 7 7 7 . . 
                . . . . . . . . . . . . . . . . 
                `],
            100,
            true
            )
        }
        if (sprites.readDataString(mySprite, "cat") == "Sam") {
            projectile = sprites.createProjectileFromSprite(img`
                ................................
                ................................
                ................................
                ................................
                ................................
                ................................
                ................................
                ................................
                ................................
                ................................
                ................................
                ................................
                ..111111111111111111111111111111
                ..111111111111111111111111111114
                ..444444411111111111111111111144
                ...4444444411111111111111111144.
                `, mySprite, -130, 0)
            projectile.setFlag(SpriteFlag.AutoDestroy, false)
            projectile.setFlag(SpriteFlag.DestroyOnWall, false)
            projectile.lifespan = 5000
            projectile.ay = 100
        }
    } else if (sprites.readDataBoolean(mySprite, "right")) {
        if (sprites.readDataString(mySprite, "cat") == "Captain Cat") {
            projectile = sprites.createProjectileFromSprite(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . b . . . . . . . . . b . b b . 
                b b b b b b b b b b b b b b b b 
                . b . . . . . . . . . b . b b . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, mySprite, 130, 0)
            projectile.setFlag(SpriteFlag.AutoDestroy, false)
        }
        if (sprites.readDataString(mySprite, "cat") == "Coco") {
            projectile = sprites.createProjectileFromSprite(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, mySprite, 130, 0)
            projectile.setFlag(SpriteFlag.AutoDestroy, false)
            animation.runImageAnimation(
            projectile,
            [img`
                . 7 7 7 7 7 2 2 2 2 2 2 2 . . . 
                7 . . . . 2 7 . . . . . . 2 . . 
                7 . . . . 2 7 . . . . . . 2 . . 
                7 . . . . 2 7 . . . . . . 2 . . 
                7 . . . . 2 7 . . . . . . 2 . . 
                7 . . . . 2 3 3 3 3 3 3 3 2 . . 
                . 5 5 5 5 2 . . . . . . . 2 . . 
                . 5 . . . 2 . . . . . . . 2 . . 
                . 5 . . . 5 2 2 2 2 2 2 2 3 . . 
                . 5 . . . 5 . . . . . . . 3 . . 
                . 5 5 5 5 5 . . . . . . . 3 . . 
                . . . . . 3 . . . . . . . 3 . . 
                . . . . . 3 . . . . . . . 3 . . 
                . . . . . . 3 3 3 3 3 3 3 . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `,img`
                . . . . . . . . 2 2 2 2 2 2 2 . 
                . 7 7 7 7 7 7 2 . . . . . . . 2 
                7 . . . . . . 2 7 . . . . . . 2 
                7 . . . . . . 2 7 . . . . . . 2 
                7 . . . . . . 2 7 . . . . . . 2 
                7 . . . . . 3 2 7 3 3 3 3 . . 2 
                7 . . . . 5 5 5 5 5 5 5 . 3 . 2 
                7 . . . 5 3 . 2 7 . . . 5 3 . 2 
                7 . . . 5 3 . . 2 2 2 2 5 2 2 . 
                . 7 7 7 5 7 7 7 . . . . 5 3 . . 
                . . . . 5 3 . . . . . . 5 3 . . 
                . . . . 5 3 . . . . . . 5 3 . . 
                . . . . 5 3 . . . . . . 5 3 . . 
                . . . . 5 . 3 3 3 3 3 3 5 . . . 
                . . . . . 5 5 5 5 5 5 5 . . . . 
                . . . . . . . . . . . . . . . . 
                `,img`
                . . . . 7 7 7 7 7 7 7 . . . . . 
                . . 7 7 5 5 5 . . . . 7 7 . . . 
                . 7 . . . . . 5 . . . . . 7 . . 
                . 7 . . . . 2 2 2 2 2 2 2 7 . . 
                7 5 . . . 2 . 5 . . . . . 2 7 . 
                7 5 . 3 2 3 3 3 3 3 . . . . 7 . 
                7 5 3 . 2 . . 5 . . 3 . . . 7 . 
                7 . 3 5 2 5 5 . . . 3 . . . 7 . 
                7 . 3 . 2 . . . . . 3 . . . 7 . 
                7 . 3 . 2 . . . . . 3 . . . 7 . 
                7 . 3 . 2 . . . . . 3 . . . 7 . 
                . 7 3 . 2 . . . . . 3 . . 7 2 . 
                . 7 3 . . 2 . . . . 3 . . 7 . . 
                . . 7 7 3 3 2 2 2 2 2 7 7 . . . 
                . . . . 7 7 7 7 7 7 7 . . . . . 
                . . . . . . . . . . . . . . . . 
                `,img`
                . . . 2 2 2 2 2 . . . . . . . . 
                . . 2 . . . . . 2 . . . . . . . 
                . . 2 . . . . . 2 . . . . . . . 
                . . 2 . . . . 5 5 5 5 5 5 5 . . 
                . . 3 3 3 3 3 3 3 . . . . . 5 . 
                . 3 2 . . . 5 . 2 3 . . . . 5 . 
                . 3 . 2 2 2 5 2 . 3 . . . . 5 . 
                . 3 . . . . 5 . . 3 . . . . 5 . 
                . 3 . . . . 5 . . 3 . . . . 5 . 
                . 3 . . . . 5 . . 3 . . . . 5 . 
                . 3 . . . . 5 . . 3 7 7 7 7 5 . 
                . 3 . . . . . 5 5 3 5 5 5 5 . . 
                . . 3 3 3 3 3 3 3 7 . . . 7 . . 
                . . . . . . . . . 7 . . . 7 . . 
                . . . . . . . . . 7 7 7 7 7 . . 
                . . . . . . . . . . . . . . . . 
                `],
            100,
            true
            )
        }
        if (sprites.readDataString(mySprite, "cat") == "Sam") {
            projectile = sprites.createProjectileFromSprite(img`
                ................................
                ................................
                ................................
                ................................
                ................................
                ................................
                ................................
                ................................
                ................................
                ................................
                ................................
                ................................
                111111111111111111111111111111..
                411111111111111111111111111111..
                441111111111111111111114444444..
                .4411111111111111111144444444...
                `, mySprite, 130, 0)
            projectile.setFlag(SpriteFlag.AutoDestroy, false)
            projectile.setFlag(SpriteFlag.DestroyOnWall, false)
            projectile.lifespan = 5000
            projectile.ay = 100
        }
    }
}
controller.player2.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Pressed, function () {
    if (game_on && p2) {
        controller.player2.moveSprite(Player_2, 100, 0)
        sprites.setDataBoolean(Player_2, "left", true)
        sprites.setDataBoolean(Player_2, "right", false)
    }
})
scene.onHitWall(SpriteKind.Projectile, function (sprite, location) {
    if (tiles.tileAtLocationIsWall(sprite.tilemapLocation().getNeighboringLocation(CollisionDirection.Right))) {
        sprite.image.flipX()
        sprite.vx = -130
    } else if (tiles.tileAtLocationIsWall(sprite.tilemapLocation().getNeighboringLocation(CollisionDirection.Left))) {
        sprite.image.flipX()
        sprite.vx = 130
    }
})
sprites.onOverlap(SpriteKind.NPC, SpriteKind.Enemy, function (sprite, otherSprite) {
    partical = sprites.create(img`
        . . . . . . . . 
        . . . . . 1 . . 
        . . . . 1 1 . . 
        . . . . . 1 . . 
        . 1 1 1 . 1 . . 
        . . . . . 1 . . 
        . . . . 1 1 1 . 
        . . . . . . . . 
        `, SpriteKind.Bakeground)
    partical.setPosition(sprite.x, sprite.y)
    partical.setVelocity(randint(-50, 50), randint(-50, 50))
    partical.lifespan = 500
    partical.setFlag(SpriteFlag.GhostThroughWalls, true)
    sprites.changeDataNumberBy(sprite, "hp", -1)
    music.powerDown.play()
    if (sprites.readDataNumber(sprite, "hp") <= 0) {
        sprite.destroy()
        sprites.readDataSprite(sprite, "hpim").destroy()
    }
    pause(1000)
})
function levels () {
    scene.setBackgroundImage(img`
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        `)
    sprites.destroyAllSpritesOfKind(SpriteKind.Bakeground, effects.disintegrate, 200)
    color.startFade(color.originalPalette, color.Black)
    color.pauseUntilFadeDone()
    tiles.setCurrentTilemap(tilemap`level1`)
    Picker = sprites.create(img`
        4 4 4 4 4 . . . . . 4 4 4 4 4 4 
        4 . . . . . . . . . . . . . . 4 
        4 . . . . . . . . . . . . . . 4 
        4 . . . . . . . . . . . . . . 4 
        4 . . . . . . . . . . . . . . 4 
        . . . . . . . 4 . . . . . . . . 
        . . . . . . . 4 . . . . . . . . 
        . . . . . 4 4 4 4 4 . . . . . . 
        . . . . . . . 4 . . . . . . . . 
        . . . . . . . 4 . . . . . . . . 
        4 . . . . . . . . . . . . . . 4 
        4 . . . . . . . . . . . . . . 4 
        4 . . . . . . . . . . . . . . 4 
        4 . . . . . . . . . . . . . . 4 
        4 . . . . . . . . . . . . . . 4 
        4 4 4 4 4 . . . . . 4 4 4 4 4 4 
        `, SpriteKind.Player)
    controller.moveSprite(Picker)
    scene.cameraFollowSprite(Picker)
    Levelslisttilemapthreebravecatwereheree = [
    assets.tile`myTile2`,
    assets.tile`myTile3`,
    assets.tile`myTile0`,
    assets.tile`myTile4`,
    assets.tile`myTile7`,
    assets.tile`myTile8`,
    assets.tile`myTile9`,
    assets.tile`myTile10`,
    assets.tile`myTile12`,
    assets.tile`myTile13`,
    assets.tile`myTile22`,
    assets.tile`myTile23`,
    assets.tile`myTile24`,
    assets.tile`myTile25`,
    assets.tile`myTile26`,
    assets.tile`myTile31`,
    assets.tile`myTile34`,
    assets.tile`myTile35`,
    assets.tile`myTile36`,
    assets.tile`myTile37`
    ]
    levelnum = 0
    allllevelpice = []
    for (let value of Levelslisttilemapthreebravecatwereheree) {
        level = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . b b b b b b b b . . . . 
            . . . b b b b b b b b b b . . . 
            . . b b 5 5 5 5 5 5 5 5 b b . . 
            . . b b 5 5 5 5 5 5 5 5 b b . . 
            . . b b 5 5 5 5 5 5 5 5 b b . . 
            . . b b 5 5 5 5 5 5 5 5 b b . . 
            . . b b 5 5 5 5 5 5 5 5 b b . . 
            . . b b 5 5 5 5 5 5 5 5 b b . . 
            . . b b 5 5 5 5 5 5 5 5 b b . . 
            . . b b 5 5 5 5 5 5 5 5 b b . . 
            . . . b b b b b b b b b b . . . 
            . . . . b b b b b b b b . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.levelpice)
        tiles.placeOnRandomTile(level, value)
        sprites.setDataNumber(level, "setlwvel", levelnum)
        levelnum += 1
        allllevelpice.push(level)
        if (blockSettings.readNumber("Levels") == sprites.readDataNumber(level, "setlwvel")) {
            level.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . b b b b b b b b . . . . 
                . . . b b b b b b b b b b . . . 
                . . b b 5 5 5 5 5 5 5 5 b b . . 
                . . b b 5 5 5 5 5 5 5 5 b b . . 
                . . b b 5 5 5 5 5 5 5 5 b b . . 
                . . b b 5 5 5 5 5 5 5 5 b b . . 
                . . b b 5 5 5 5 5 5 5 5 b b . . 
                . . b b 5 5 5 5 5 5 5 5 b b . . 
                . . b b 5 5 5 5 5 5 5 5 b b . . 
                . . b b 5 5 5 5 5 5 5 5 b b . . 
                . . . b b b b b b b b b b . . . 
                . . . . b b b b b b b b . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
            sprites.setDataBoolean(level, "playable", true)
        } else if (blockSettings.readNumber("Levels") > sprites.readDataNumber(level, "setlwvel")) {
            level.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . b b b b b b b b . . . . 
                . . . b b b b b b b b b b . . . 
                . . b b 8 8 8 8 8 8 8 8 b b . . 
                . . b b 8 8 8 8 8 8 8 8 b b . . 
                . . b b 8 8 8 8 8 8 8 8 b b . . 
                . . b b 8 8 8 8 8 8 8 8 b b . . 
                . . b b 8 8 8 8 8 8 8 8 b b . . 
                . . b b 8 8 8 8 8 8 8 8 b b . . 
                . . b b 8 8 8 8 8 8 8 8 b b . . 
                . . b b 8 8 8 8 8 8 8 8 b b . . 
                . . . b b b b b b b b b b . . . 
                . . . . b b b b b b b b . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
            sprites.setDataBoolean(level, "playable", true)
        } else if (blockSettings.readNumber("Levels") < sprites.readDataNumber(level, "setlwvel")) {
            level.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . b b b b b b b b . . . . 
                . . . b b b b b b b b b b . . . 
                . . b b 2 2 2 2 2 2 2 2 b b . . 
                . . b b 2 2 2 2 2 2 2 2 b b . . 
                . . b b 2 2 2 2 2 2 2 2 b b . . 
                . . b b 2 2 2 2 2 2 2 2 b b . . 
                . . b b 2 2 2 2 2 2 2 2 b b . . 
                . . b b 2 2 2 2 2 2 2 2 b b . . 
                . . b b 2 2 2 2 2 2 2 2 b b . . 
                . . b b 2 2 2 2 2 2 2 2 b b . . 
                . . . b b b b b b b b b b . . . 
                . . . . b b b b b b b b . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
            sprites.setDataBoolean(level, "playable", false)
        }
        if (value.getPixel(0, 0) == 5) {
            tiles.setTileAt(level.tilemapLocation(), assets.tile`myTile`)
        }
        if (value.getPixel(0, 0) == 7) {
            tiles.setTileAt(level.tilemapLocation(), assets.tile`myTile5`)
        }
        if (value.getPixel(0, 0) == 6) {
            tiles.setTileAt(level.tilemapLocation(), assets.tile`myTile11`)
        }
        if (value.getPixel(0, 0) == 11) {
            tiles.setTileAt(level.tilemapLocation(), assets.tile`myTile17`)
        }
        if (value.getPixel(0, 0) == 13) {
            tiles.setTileAt(level.tilemapLocation(), img`
                8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
                8 8 8 d d d 8 8 8 8 8 8 8 8 8 8 
                8 8 d d 7 d d d 8 8 8 8 8 8 8 8 
                8 d d 7 7 7 7 d d 8 8 8 8 8 8 8 
                8 d d 7 7 6 6 7 d 8 8 8 8 8 8 8 
                8 8 d 7 7 6 e 6 8 8 8 8 8 8 8 8 
                8 8 d 7 7 e 7 6 8 8 8 8 8 d d 8 
                8 8 d 7 7 7 d d 8 8 8 d d d d 8 
                8 d d 7 7 d d 8 8 8 6 d 7 7 d 8 
                8 d d d d d 8 8 8 6 6 6 7 7 d 8 
                8 8 8 8 8 8 8 8 d 6 6 6 7 d d 8 
                8 8 8 8 8 8 8 d d 6 e 6 7 d d 8 
                8 8 8 8 8 8 8 d 7 7 e 7 7 7 d 8 
                8 8 8 8 8 8 8 d 7 7 7 7 7 d d 8 
                8 8 8 8 8 8 8 d d d d d d d 8 8 
                8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
                `)
        }
        if (value.getPixel(0, 0) == 14) {
            tiles.setTileAt(level.tilemapLocation(), img`
                8 8 8 8 8 8 8 8 8 8 8 8 1 8 8 8 
                8 8 8 d d d 8 8 8 8 8 8 1 1 8 8 
                8 8 d d 7 d d d 8 8 8 e e 1 e e 
                8 d d 7 7 7 7 d d 8 8 8 e e e 8 
                8 d d 7 7 6 6 7 d 8 8 8 8 8 8 8 
                8 8 d 7 7 6 e 6 8 8 8 8 8 8 8 8 
                8 8 d 7 7 e 7 6 8 8 8 8 8 d d 8 
                8 8 d 7 7 7 d d 8 8 8 d d d d 8 
                8 d d 7 7 d d 8 8 8 6 d 7 7 d 8 
                8 d d d d d 8 8 8 6 6 6 7 7 d 8 
                8 1 8 8 8 8 8 8 d 6 6 6 7 d d 8 
                8 1 1 8 8 8 8 d d 6 e 6 7 d d 8 
                e e 1 e e 8 8 d 7 7 e 7 7 7 d 8 
                8 e e e 8 8 8 d 7 7 7 7 7 d d 8 
                8 8 8 8 8 8 8 d d d d d d d 8 8 
                8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
                `)
        }
        if (blockSettings.readNumber("Levels") == sprites.readDataNumber(level, "setlwvel")) {
            tiles.placeOnTile(Picker, level.tilemapLocation().getNeighboringLocation(CollisionDirection.Top))
        }
        sprites.setDataBoolean(level, "Bad", false)
    }
    color.startFade(color.Black, color.originalPalette)
    levelslacker = true
    game_on = false
}
controller.player2.onEvent(ControllerEvent.Connected, function () {
    p2 = true
    if (!(spriteutils.isDestroyed(Player_2))) {
        Player_2.setKind(SpriteKind.Player)
    }
})
sprites.onOverlap(SpriteKind.NPC, SpriteKind.EP_NOTTHEMUCISTIME, function (sprite, otherSprite) {
    otherSprite.destroy()
    partical = sprites.create(img`
        . . . . . . . . 
        . . . . . 1 . . 
        . . . . 1 1 . . 
        . . . . . 1 . . 
        . 1 1 1 . 1 . . 
        . . . . . 1 . . 
        . . . . 1 1 1 . 
        . . . . . . . . 
        `, SpriteKind.Bakeground)
    partical.setPosition(sprite.x, sprite.y)
    partical.setVelocity(randint(-50, 50), randint(-50, 50))
    partical.setFlag(SpriteFlag.GhostThroughWalls, true)
    sprites.changeDataNumberBy(sprite, "hp", -1)
    partical.lifespan = 500
    music.powerDown.play()
    if (sprites.readDataNumber(sprite, "hp") <= 0) {
        sprite.destroy()
        sprites.readDataSprite(sprite, "hpim").destroy()
    }
})
function zoomswitch () {

    if (zoom2) {
        zoom2 = false
    } else {
        zoom2 = true
    }
}
scene.systemMenu.addEntry(() => `Zoom When Hit`, () => zoomswitch(), img`
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    .b.....b........................
    ...b.b..........................
    ..bbbbb.........................
    ...bbb..........................
    ..bbbbb.........................
    ...b.b..........................
    .b.....b........................
    ...44445.44445.44445.445..445...
    ......45.45.45.45.45.45454545...
    .....45..45.45.45.45.45.45.45...
    ....45...45.45.45.45.45....45...
    ...45....45.45.45.45.45....45...
    ...44445.44445.44445.45....45...
    ......................b...b.....
    ...b....b.......................
    .....bb.................b.......
    ....bbbb........................
    ....bbbb..............b...b.....
    .....bb.........................
    ...b....b.......................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
`)
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (zoom3 && game_on) {
        zoom += -1
    }
})
let WInd: Sprite = null
let radom_14 = 0
let level: Sprite = null
let levelnum = 0
let Levelslisttilemapthreebravecatwereheree: Image[] = []
let projectile: Sprite = null
let bothdead = false
let Player_3: Sprite = null
let Player_1: Sprite = null
let Picker: Sprite = null
let enty: Sprite = null
let NPCs: Sprite = null
let levelslacker = false
let Player_2: Sprite = null
let game_on = false
let partical: Sprite = null
let levelslishthreebravedogs: tiles.TileMapData[] = []
let zoom2 = false
let zoom3 = false
let allllevelpice: Sprite[] = []
let intro = false
let mySprite: Sprite = null
let p2 = false
let levelnublucasM = 0
let zoom = 0
if (!(blockSettings.exists("checkpoint"))) {
    blockSettings.writeNumber("checkpoint", 9999999)
}
if (!(blockSettings.exists("Levels"))) {
    blockSettings.writeNumber("Levels", 0)
}
zoom = 1
levelnublucasM = 0
p2 = false
scene.setBackgroundImage(img`
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    `)
mySprite = sprites.create(img`
    .....bbbbbbbbbb..........................................bbbbbbbb...................................................bbbbbb......................................
    ..bbbbbbbbbbbbbbb.....................................bbbbbbbbbbbb.................................................bbbbbbb......................................
    bbbbbb.......bbbb....................................bbbbb.....bbb................................................bbb..bbb......................................
    bbb....bb....bbbc...................................bbbb......bbbc...............................................bbb...bbb.............bb.......................
    ......bbbccccbbbc..................................bbbb...b..bbbbc..............................................bbb...bbbcc...........bbb.......................
    ....cbbbcccccbbcccc.................................b....bbbbbbcccc............................................bbb...cbbcccc..........bb........................
    ...ccbbb....bbbcccc......................................bbbb....cc...........................................bbb...ccc..ccc.........bbb........................
    ...cbbb...ccbbcccc......................................bbbbbbb.ccc...........................................bbb..ccc...ccc.........bb.........................
    ...cbbb..ccbbbbbbbc..bb..bbb...bbbbb...bbbbb...........bbb.cbbbbccbbb..bb....bbbbbb...bbb..bb....bbbb........bbb..ccc....cbbbbbb..bbbbbbbbbb....................
    ...bbb..cccbbbbbbbc..bbbbbbb..bbbbbb..bbbbbb...........bbb.ccbbbccbbbbbbbb..bbbbbbbb..bb...bb..bbbbbbb.......bbb.ccc....cbbbbbbbb.bbbbbbbbbb....................
    ...bbb.cc.bbbbcbbb...bbb.bbb.bbb.bbb.bbb.bbb..........bbb..ccbbbc.bbb.bbb..bbb..bbb...bb..bbb.bbb..bb.......bbb.ccc....bbbb..bbb...bbb.cccbbb...................
    ..bbb..cc.bbb.cbbc..bbb.bbb.cbb.bbbcbbb.bbbc..........bbb.cccbbbcbbb.bbbc.bbb...bbb..bbb..bb..bbbbbbb.......bbb.ccc...bbbb...bbb..cbbc.ccbcbbb..................
    ..bbb.cc.bbb.cbbbccbbbcbbbccbbbbbbccbbbbbbccbb.......bbb..ccbbbbcbbbcbbccbbbb..bbbbccbbb.bbb.bbbbbbcccbb....bbbccc..bbbbb...bbbbccbbbccbbbccbbc.................
    .bbb.ccc.bb..cbbccbbbbcbbcbbbbbbcccbbbbbcccbbb.......bbb.cbbbbbcbbb.bbbbbbbb..bbbbccbbb.bbbbbbbbbcccbbbc....bbbcccbbbbbbb..bbbbccbbbccbbbcccbbb.................
    .bbb.cc.bbb.cbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbb......bbbbbbbbbb..cbbbcbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbc.....bbbbbbbbb..bbbbbbbbbbbbbbbbbbbbbbbc.................
    bbb.ccc.bb..cbbbbbbbb.cbbbcccbbbbbbccbbbbbbcc.....bbbbbbbbb....cbbccbbbcccbbbbb.bbbbcbbbbc..ccbbbbbbcc.......bbbbbbb...bbbbb.bbbbcbbbbcbbbbbbcc.................
    bb..cc......ccccccc..ccccccccccccccc..cccccc.........bbccc....cccc.ccccccc.cccc..cccc.cccc.cccccccccc.........ccc.....ccccc...cccc.cccc..ccc..cc................
    ...ccc.....cc...ccc.cccc.cccccccccc..ccccc...cc........ccc..cccc...cc.ccccccccc.ccccc.cccccccccccccc...c......cccc...ccccccc.ccccc.cccc.ccc...cc................
    ...cc......cc...ccccccc..ccccccccccccccccccccc.......cccccccccc...cc..ccccc.ccccccccccccccccccccccccccc........cccccccc..ccccccccccccccccccc.ccc................
    ...cc......c....cccccc...ccc...ccccc...ccccc.........cccccccc..........cc....ccc...cc...ccc......cccc...........ccccc.....ccc...cc..cccc..ccccc.................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ...........................................................................bbbbb................................................................................
    .........................................................................bbbbbbbb...............................................................................
    .......................................................................bbb.....bbb..............................................................................
    ......................................................................bbb.......bb..............................................................................
    ......................................................................bb......ccbb..............................................................................
    ......................................................................b.....ccccbbc.............................................................................
    ..........................................................................c....cbbc.............................................................................
    .........................................................................c.....bbccc............................................................................
    ...............................................................................bb.cc............................................................................
    ..............................................................................bb..c.............................................................................
    .............................................................................bb...c.............................................................................
    ............................................................................bbb...cc............................................................................
    ...........................................................................bbb...cbb............................................................................
    ....................................................................bbbbb.bbb...ccbb............................................................................
    ...................................................................bbbbbbbbb....ccbb............................................................................
    ...................................................................bb...bbbbb..c.bb.............................................................................
    ...................................................................bbbbbbb.bbbbbbbb.............................................................................
    ....................................................................bbbbbc..cbbbbb..c...........................................................................
    .....................................................................ccccccccc......c...........................................................................
    ......................................................................cc..cccc......c...........................................................................
    ......................................................................cccccc..ccc.cc............................................................................
    ......................................................................cccc......ccc.............................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ..........b.....................................................................................................................................................
    ........bbbbbb........................................................................................b...........................bbbbb.........................
    .......bbb....b.......................................................................................b...........................b...bb........................
    .........b.....b.....................................................................................bb...........................b....b........................
    .........b.....b.....................................................................................b...........................bb.............................
    ........bb.....b.....................................................................................b...........................bb.............................
    ........b......b.....................................................................................b............................b.............................
    ........b......b.....................................................................................b............................b.............................
    ........b......b..........b..........................................b.......................b......bb............................bb............................
    ........b.....b...........b..........................................b.......................b......b..............................b............................
    .......bb....bb..........bb.........................................bb.......................b......b..............................b............................
    .......bb..bbb.....bbb.bbbbbb...b........bb.bbb..b..bbb...........bbbbbb....bbb............bbbbbb...b..bb......bbb..................b......bbb......bbb.........
    .......bbbbb......b..b...b.....b.....b...b.bb....b..b.b.............b......bb..b.............b......b.b..b....b..b..................b.....bb..b....bb.bb........
    .......b.b.......bb..b...b.....b....bb...bbb.....b.b..b.............b.....bb...b............b......bbb...b...b...b...........b......bb....b...b...bb..bb........
    .......b.b.......b...b...b.....b....b....bb......b.b..b.............b.....b....b............b......bbb...b...b..bb..........bb.......b...bb..b...bb..bb.........
    ......b..b.......b..b...b......b...bb....b......bbb...b............b......b....b............b......bb...bb..b..bb...........b........b...b..bb...b...bb.........
    ......b..b......bbbb....b.....bb...bb...bb......bbb...b............b.....b.....b............b......bb...b...bbbb...........b.........b...bbb....bb..bbb.........
    ......b..b......bb......b.....b...bbb...bb......bb...bb............b.....b....b............bb......b....b...bb.............b.........b...b......b...bbb.........
    ......b..b......b.......b.....b..bbb....b.......bb...b.............b.....b....b............b......bb....b...b..............b.........b...b......b..b.bb.........
    .....bb...b.....b.......b.....b..b.b....b.......b....b.............b.....b...bb............b......b.....b...b..............bb.......b....b.....b..bb.bb.........
    .....b....b.....b...b...b.b...b.b..b....b......bb....b.............b.b...b..bb.............b..b...b.....b...b...b...........bb.....bb....b...b.b.bb..bb.........
    .....b....bb.....bbb....bbb...bbb..b...b.......b.....b.............bbb....bbb..............bbb....b....bb...bbbb.............bbbbbbb.....bbbb..bbb....b.........
    ...........b....................................................................................................................................................
    ...........bb...................................................................................................................................................
    ............bb.............b....................................................................................................................................
    .............bb...........bb....................................................................................................................................
    ..............bb.........b......................................................................................................................................
    ................bbbbbbbbb.......................................................................................................................................
    ................................................................................................................................................................
    `, SpriteKind.Bakeground)
mySprite = sprites.create(img`
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    .....................................................1...1......................................................................................................
    ....................................................111.....1...................................................................................................
    .....................................................1.....111..................................................................................................
    ............................................................1...................................................................................................
    .......................................................1.1.....1................................................................................................
    ........................................................1........1..............................................................................................
    .......................................................1.1...1..................................................................................................
    ......................................................1.........................................................................................................
    ..........................................................1.....................................................................................................
    ....................................................e...........................................................................................................
    ...................................................e............................................................................................................
    ..................................................e...........c.................................................................................................
    .................................................e...........cc.................................................................................................
    ................................................e..........cccc.................................................................................................
    ...............................................e..........ccccc...............................ccccc.....................ccc.....................................
    ..............................................e.........ccccccc..............................ccccc.....................cc.......................................
    ..............................................e........cccccccc....ccc.....................ccccccc.................cccccc.......................................
    .............................................e........ccccccccc.ccccc.....................ccccccc................cccccccc.......................................
    ............................................e........ccccccccccccccc.....................ccccccc8cccc............ccccccccccccc..................................
    ...........................................e.........cccccccccccccc....................ccccccccccccc.............ccccccccccccc..................................
    .........................................ce.........ccccccccccccccc...................c8cccccccccccc.............ccccccccccc....................................
    ........................................ccc.........ccccccccccccccc..................c8cccccccccccc.............ccccccccccc.....................................
    .......................................ccccc.......ccccccccccccccc....................cccccccccccc.............ccccccccccc......................................
    .......................................cccc........cccccccccccccc.....................cccccccccccc.............ccccccccccc......................................
    ......................................cccc.........cccccccccccccc.....................cccccccccccc............ccccccccccccc.....................................
    ......................................cccc.........cccccccccccccc.....................cccccccccccc............ccccccccccccc.....................................
    ......................................cccc.........cccccccccccccc....................cccccccccccc.............ccccccccccccc.....................................
    .......................................cccc........cccccccccccccc....................cccccccccccc.............ccccccccccccc.....................................
    .......................................cccc........cccccccccccccc...................ccccccccccccc.............ccccccccccccc.....................................
    .......................................ccccc.......ccccccccccccc....................ccccccccccccc.............ccccccccccccc.....................................
    ........................................cccc........cccccccccccc....................cccccccccccc..............cccccccccccc......................................
    .........................................cccc........cccccccccc......ccc............cccccccccccc..............ccccccccccc.......................................
    ..........................................cccc.......cccccccc........cccc...........cccccccccccc...............ccccccccc........................................
    ..........................................ccccc.....ccccccccccc......ccccc...........cccccccccc................cccccccc.........................................
    ...........................................ccccc....ccccccccccc......ccccc............ccccccccc...............cccccccccc........................................
    ............................................cccccc..cccccccccccc.....ccccc.............ccccccc................cccccccccccccc....................................
    .............................................ccccccccccccccccccc.....ccccc................ccc................ccccccccccccccc....................................
    ..............................................cccccccccccccccccc.....ccccccccccccccccccccccccc...............ccccccccccccccccc..................................
    ...............................................cccccccccccccccccc....ccccccccccccccccccccccccccc.............ccccccccccccccccc..................................
    ...................................................cccccccccccccc....ccccccccccccccccccccccccccccc...........ccccccccccccccccc..................................
    ...................................................cccccccccccccc....ccccccccccccccccccccccccccccc............ccccccccccccccccc.................................
    ....................................................ccccccccccccc....ccccc..........cccccccccccccc............ccccccccccccccccc.................................
    ....................................................ccccccccccccc....ccccc..........cccccccccccccc............cccccccccccccccccc................................
    ....................................................ccccccccccccc....ccccc..........cccccccccccccc............ccccccccccccccccccc...............................
    .....................................................cccccccccccc....ccccc..........cccccccccccccc............cccccccccccccccccccccc............................
    .....................................................cccccccccccc....ccccc..........cccccccccccccc............ccccccccccccccccccccccccc.........................
    .....................................................cccccccccccc....ccccc..........cccccccccccccc............ccccccccccccccccccccccccccc.......................
    ......................................................ccccccccccc....ccccc..........cccccccccccccc............cccccccccccccccccccccccccccc......................
    .......................................................ccccccccc.....ccccc..........cccccccccccccc............cccccccccccccccccccccccccccc......................
    .......................................................ccccccccc.....ccccc..........cccccccccccccc............cccccccccccccccccccccccccccc......................
    ........................................................ccccccc......ccccc...........cccccccccccc.............cccccccccccccccccccccccccccc......................
    ........................................................ccccccc......ccccc...........cccccccccccc..............cccccccccccccccccccccccccc.......................
    ........................................................ccccccc......ccccc...........cccccccccccc..............cccccccccc..cccccccccccccc.......................
    ........................................................ccccccc......ccccc............cccccccccc................ccccccccc...ccccccccccccc.......................
    ........................................................ccccccc......ccccc............cccccccccc................ccccccccc....cccccccccccc.......................
    ........................................................ccccccc......ccccc............cccccccccc................ccccccccc.....cccccccccc........................
    ........................................................ccccccc......ccccc.............cccccccc.................cccccccc......ccccccccc.........................
    ........................................................ccccccc......ccccc.............cccccccc.................cccccccc.......cccccc...........................
    ........................................................ccccccc......ccccc.............cccccccc.................cccccccc........................................
    ........................................................ccccccc......ccccc.............cccccccc.................cccccccc........................................
    ........................................................ccccccc......ccccc.............cccccccc.................cccccccc........................................
    ........................................................ccccccc......ccccc.............cccccccc.................cccccccc........................................
    ........................................................ccccccc......ccccc.............cccccccc.................cccccccc........................................
    `, SpriteKind.Bakeground)
mySprite.z = -2
animation.runImageAnimation(
mySprite,
[img`
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ..................................................1...1.........................................................................................................
    .................................................111.....1......................................................................................................
    ..................................................1.....111.....................................................................................................
    .........................................................1......................................................................................................
    ....................................................1.1.....1...................................................................................................
    .....................................................1........1.................................................................................................
    ....................................................1.1...1.....................................................................................................
    ...................................................1............................................................................................................
    .......................................................1........................................................................................................
    .................................................e..............................................................................................................
    ................................................e...............................................................................................................
    ...............................................e...........c....................................................................................................
    ..............................................e...........cc....................................................................................................
    .............................................e..........cccc....................................................................................................
    ............................................e..........ccccc...............................ccccc.....................ccc........................................
    ...........................................e.........ccccccc..............................ccccc.....................cc..........................................
    ...........................................e........cccccccc....ccc.....................ccccccc.................cccccc..........................................
    ..........................................e........ccccccccc.ccccc.....................ccccccc................cccccccc..........................................
    .........................................e........ccccccccccccccc.....................ccccccc.cccc............ccccccccccccc.....................................
    ........................................e.........cccccccccccccc....................ccccccccccccc.............ccccccccccccc.....................................
    ......................................ce.........ccccccccccccccc...................c.cccccccccccc.............ccccccccccc.......................................
    .....................................ccc.........ccccccccccccccc..................c.cccccccccccc.............ccccccccccc........................................
    ....................................ccccc.......ccccccccccccccc....................cccccccccccc.............ccccccccccc.........................................
    ....................................cccc........cccccccccccccc.....................cccccccccccc.............ccccccccccc.........................................
    ...................................cccc.........cccccccccccccc.....................cccccccccccc............ccccccccccccc........................................
    ...................................cccc.........cccccccccccccc.....................cccccccccccc............ccccccccccccc........................................
    ...................................cccc.........cccccccccccccc....................cccccccccccc.............ccccccccccccc........................................
    ....................................cccc........cccccccccccccc....................cccccccccccc.............ccccccccccccc........................................
    ....................................cccc........cccccccccccccc...................ccccccccccccc.............ccccccccccccc........................................
    ....................................ccccc.......ccccccccccccc....................ccccccccccccc.............ccccccccccccc........................................
    .....................................cccc........cccccccccccc....................cccccccccccc..............cccccccccccc.........................................
    ......................................cccc........cccccccccc......ccc............cccccccccccc..............ccccccccccc..........................................
    .......................................cccc.......cccccccc........cccc...........cccccccccccc...............ccccccccc...........................................
    .......................................ccccc.....ccccccccccc......ccccc...........cccccccccc................cccccccc............................................
    ........................................ccccc....ccccccccccc......ccccc............ccccccccc...............cccccccccc...........................................
    .........................................cccccc..cccccccccccc.....ccccc.............ccccccc................cccccccccccccc.......................................
    ..........................................ccccccccccccccccccc.....ccccc................ccc................ccccccccccccccc.......................................
    ...........................................cccccccccccccccccc.....ccccccccccccccccccccccccc...............ccccccccccccccccc.....................................
    ............................................cccccccccccccccccc....ccccccccccccccccccccccccccc.............ccccccccccccccccc.....................................
    ................................................cccccccccccccc....ccccccccccccccccccccccccccccc...........ccccccccccccccccc.....................................
    ................................................cccccccccccccc....ccccccccccccccccccccccccccccc............ccccccccccccccccc....................................
    .................................................ccccccccccccc....ccccc..........cccccccccccccc............ccccccccccccccccc....................................
    .................................................ccccccccccccc....ccccc..........cccccccccccccc............cccccccccccccccccc...................................
    .................................................ccccccccccccc....ccccc..........cccccccccccccc............ccccccccccccccccccc..................................
    ..................................................cccccccccccc....ccccc..........cccccccccccccc............cccccccccccccccccccccc...............................
    ..................................................cccccccccccc....ccccc..........cccccccccccccc............ccccccccccccccccccccccccc............................
    ..................................................cccccccccccc....ccccc..........cccccccccccccc............ccccccccccccccccccccccccccc..........................
    ...................................................ccccccccccc....ccccc..........cccccccccccccc............cccccccccccccccccccccccccccc.........................
    ....................................................ccccccccc.....ccccc..........cccccccccccccc............cccccccccccccccccccccccccccc.........................
    ....................................................ccccccccc.....ccccc..........cccccccccccccc............cccccccccccccccccccccccccccc.........................
    .....................................................ccccccc......ccccc...........cccccccccccc.............cccccccccccccccccccccccccccc.........................
    .....................................................ccccccc......ccccc...........cccccccccccc..............cccccccccccccccccccccccccc..........................
    .....................................................ccccccc......ccccc...........cccccccccccc..............cccccccccc..cccccccccccccc..........................
    .....................................................ccccccc......ccccc............cccccccccc................ccccccccc...ccccccccccccc..........................
    .....................................................ccccccc......ccccc............cccccccccc................ccccccccc....cccccccccccc..........................
    .....................................................ccccccc......ccccc............cccccccccc................ccccccccc.....cccccccccc...........................
    .....................................................ccccccc......ccccc.............cccccccc.................cccccccc......ccccccccc............................
    .....................................................ccccccc......ccccc.............cccccccc.................cccccccc.......cccccc..............................
    .....................................................ccccccc......ccccc.............cccccccc.................cccccccc...........................................
    .....................................................ccccccc......ccccc.............cccccccc.................cccccccc...........................................
    .....................................................ccccccc......ccccc.............cccccccc.................cccccccc...........................................
    .....................................................ccccccc......ccccc.............cccccccc.................cccccccc...........................................
    `,img`
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................11..............................................................................................................
    ................................................11........11....................................................................................................
    ..........................................................11....................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    .....................................................11.........................................................................................................
    .................................................1...11.........................................................................................................
    ................................................111.............................................................................................................
    .................................................1..1...........................................................................................................
    ...................................................111..........................................................................................................
    .................................................e..1...........................................................................................................
    ................................................e...............................................................................................................
    ...............................................e................................................................................................................
    ..............................................e.................................................................................................................
    .............................................e.............cc.....c..................................................c..........................................
    ............................................e...........cccc.....cc.................................................cc..........................................
    ...........................................e..........ccccc....cccc........................ccccc...................ccc..........................................
    ...........................................e........ccccccc...ccccc.....................ccccccc.................cccccc..........................................
    ..........................................e........ccccccccc.ccccc.....................ccccccc................ccccccccccccccc...................................
    .........................................e........ccccccccccccccc.....................ccccccc.................cccccccccccccc....................................
    ........................................e.........cccccccccccccc....................cccccccccccccc............ccccccccccccc.....................................
    ......................................ce.........ccccccccccccccc..................cc.cccccccccccc.............ccccccccccc.......................................
    .....................................ccc.........ccccccccccccccc....................cccccccccccc.............ccccccccccc........................................
    ....................................ccccc.......ccccccccccccccc....................cccccccccccc.............ccccccccccc.........................................
    ....................................cccc........cccccccccccccc.....................cccccccccccc.............ccccccccccc.........................................
    ...................................cccc.........cccccccccccccc.....................cccccccccccc............ccccccccccccc........................................
    ...................................cccc.........cccccccccccccc.....................cccccccccccc............ccccccccccccc........................................
    ...................................cccc.........cccccccccccccc....................cccccccccccc.............ccccccccccccc........................................
    ....................................cccc........cccccccccccccc....................cccccccccccc.............ccccccccccccc........................................
    ....................................cccc........cccccccccccccc...................ccccccccccccc.............ccccccccccccc........................................
    ....................................ccccc.......ccccccccccccc....................ccccccccccccc.............ccccccccccccc........................................
    .....................................cccc........cccccccccccc....................cccccccccccc..............cccccccccccc.........................................
    ......................................cccc........cccccccccc......ccc............cccccccccccc..............ccccccccccc..........................................
    .......................................cccc.......cccccccc........cccc...........cccccccccccc...............ccccccccc...........................................
    .......................................ccccc.....ccccccccccc......ccccc...........cccccccccc................cccccccc............................................
    ........................................ccccc....ccccccccccc......ccccc............ccccccccc...............cccccccccc...........................................
    .........................................cccccc..cccccccccccc.....ccccc.............ccccccc................ccccccccccccccc......................................
    ..........................................ccccccccccccccccccc.....ccccc................ccc................cccccccccccccccccc....................................
    ...........................................cccccccccccccccccc.....ccccccccccccccccccccccccc...............cccccccccccccccccccc..................................
    ............................................cccccccccccccccccc....ccccccccccccccccccccccccccc.............ccccccccccccccccccccccc...............................
    ................................................cccccccccccccc....ccccccccccccccccccccccccccccc...........ccccccccccccccccccccccccc.............................
    ................................................cccccccccccccc....ccccccccccccccccccccccccccccc............ccccccccccccccccccccccccccc..........................
    .................................................ccccccccccccc....ccccc..........cccccccccccccc............ccccccccccccccccccccccccccc..........................
    .................................................ccccccccccccc....ccccc..........cccccccccccccc............ccccccccccccccccccccccccccc..........................
    .................................................ccccccccccccc....ccccc..........cccccccccccccc............ccccccccccccccccccccccccccc..........................
    ..................................................cccccccccccc....ccccc..........cccccccccccccc............ccccccccccccccccccccccccccc..........................
    ..................................................cccccccccccc....ccccc..........cccccccccccccc............ccccccccccccccccccccccccccc..........................
    ..................................................cccccccccccc....ccccc..........cccccccccccccc............ccccccccccccccccccccccccccc..........................
    ...................................................ccccccccccc....ccccc..........cccccccccccccc............ccccccccccccccccccccccccccc..........................
    ....................................................ccccccccc.....ccccc..........cccccccccccccc............cccccccccccccccccccccccccc...........................
    ....................................................ccccccccc.....ccccc..........cccccccccccccc............cccccccccccccccccccccccccc...........................
    .....................................................ccccccc......ccccc...........cccccccccccc.............cccccccccccccccccccccccccc...........................
    .....................................................ccccccc......ccccc...........cccccccccccc..............ccccccccccc..ccccccccccc............................
    .....................................................ccccccc......ccccc...........cccccccccccc..............cccccccccc...ccccccccccc............................
    .....................................................ccccccc......ccccc............cccccccccc................ccccccccc...ccccccccccc............................
    .....................................................ccccccc......ccccc............cccccccccc................ccccccccc....ccccccccc.............................
    .....................................................ccccccc......ccccc............cccccccccc................ccccccccc..........................................
    .....................................................ccccccc......ccccc.............cccccccc.................cccccccc...........................................
    .....................................................ccccccc......ccccc.............cccccccc.................cccccccc...........................................
    .....................................................ccccccc......ccccc.............cccccccc.................cccccccc...........................................
    .....................................................ccccccc......ccccc.............cccccccc.................cccccccc...........................................
    .....................................................ccccccc......ccccc.............cccccccc.................cccccccc...........................................
    .....................................................ccccccc......ccccc.............cccccccc.................cccccccc...........................................
    `,img`
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    .................................................1..............................................................................................................
    ...........................................................1....................................................................................................
    ...............................................1.....1..........................................................................................................
    ..............................................111...............................................................................................................
    ...............................................1................................................................................................................
    ......................................................1.........................................................................................................
    .................................................11.....1.......................................................................................................
    ..............................................1..11....111......................................................................................................
    .............................................111....11..1.......................................................................................................
    ..............................................1.....11..........................................................................................................
    .................................................e..............................................................................................................
    ................................................e...............................................................................................................
    ...............................................e................................................................................................................
    ..............................................e.................................................................................................................
    .............................................e............ccccc....cc...........................................................................................
    ............................................e..........ccccccc...ccc.........................cc.................................................................
    ...........................................e........cccccccc...cccc........................cccc..........................ccc....................................
    ...........................................e........ccccccc...ccccc......................ccccc.......................cccccc.....................................
    ..........................................e........ccccccccc.ccccc.....................cccccc....cc..............cccccccc.......................................
    .........................................e........ccccccccccccccc.....................ccccccc..ccc............ccccccccc.........................................
    ........................................e.........cccccccccccccc....................ccccccccccccc.............ccccccccccccc.....................................
    ......................................ce.........ccccccccccccccc...................c.ccccccccccc..............ccccccccccc.......................................
    .....................................ccc.........ccccccccccccccc..................c.ccccccccccc..............ccccccccccc........................................
    ....................................ccccc.......ccccccccccccccc....................cccccccccccc.............ccccccccccc.........................................
    ....................................cccc........cccccccccccccc.....................cccccccccccc.............ccccccccccc.........................................
    ...................................cccc.........cccccccccccccc.....................cccccccccccc............ccccccccccccc........................................
    ...................................cccc.........cccccccccccccc.....................cccccccccccc............ccccccccccccc........................................
    ...................................cccc.........cccccccccccccc....................cccccccccccc.............ccccccccccccc........................................
    ....................................cccc........cccccccccccccc....................cccccccccccc.............ccccccccccccc........................................
    ....................................cccc........cccccccccccccc...................ccccccccccccc.............ccccccccccccc........................................
    ....................................ccccc.......ccccccccccccc....................ccccccccccccc.............ccccccccccccc........................................
    .....................................cccc........cccccccccccc....................cccccccccccc..............cccccccccccc.........................................
    ......................................cccc........cccccccccc......ccc............cccccccccccc..............ccccccccccc..........................................
    .......................................cccc.......cccccccc........cccc...........cccccccccccc...............ccccccccc...........................................
    .......................................ccccc.....ccccccccccc......ccccc...........cccccccccc................cccccccc............................................
    ........................................ccccc....ccccccccccc......ccccc............ccccccccc...............cccccccccc...........................................
    .........................................cccccc..cccccccccccc.....ccccc.............ccccccc................cccccccccccccc.......................................
    ..........................................ccccccccccccccccccc.....ccccc................ccc................cccccccccccccccccc....................................
    ...........................................cccccccccccccccccc.....ccccccccccccccccccccccccc...............ccccccccccccccccccc...................................
    ............................................cccccccccccccccccc....ccccccccccccccccccccccccccc.............cccccccccccccccccccc..................................
    ................................................cccccccccccccc....ccccccccccccccccccccccccccccc...........cccccccccccccccccccc..................................
    ................................................cccccccccccccc....ccccccccccccccccccccccccccccc............cccccccccccccccccccc.................................
    .................................................ccccccccccccc....ccccc..........cccccccccccccc............ccccccccccccccccccccc................................
    .................................................ccccccccccccc....ccccc..........cccccccccccccc............cccccccccccccccccccccc...............................
    .................................................ccccccccccccc....ccccc..........cccccccccccccc............cccccccccccccccccccccccccccccc.......................
    ..................................................cccccccccccc....ccccc..........cccccccccccccc............cccccccccccccccccccccccccccccc.......................
    ..................................................cccccccccccc....ccccc..........cccccccccccccc............cccccccccccccccccccccccccccccc.......................
    ..................................................cccccccccccc....ccccc..........cccccccccccccc............cccccccccccccccccccccccccccccc.......................
    ...................................................ccccccccccc....ccccc..........cccccccccccccc............cccccccccccccccccccccccccccccc.......................
    ....................................................ccccccccc.....ccccc..........cccccccccccccc............cccccccccccccccccccccccccccccc.......................
    ....................................................ccccccccc.....ccccc..........cccccccccccccc............cccccccccccccccccccccccccccccc.......................
    .....................................................ccccccc......ccccc...........cccccccccccc.............ccccccccccccccc...cccccccccccc.......................
    .....................................................ccccccc......ccccc...........cccccccccccc..............ccccccccccc......ccccccccccc........................
    .....................................................ccccccc......ccccc...........cccccccccccc..............cccccccccc........ccccccccc.........................
    .....................................................ccccccc......ccccc............cccccccccc................ccccccccc.........ccccccc..........................
    .....................................................ccccccc......ccccc............cccccccccc................ccccccccc..........................................
    .....................................................ccccccc......ccccc............cccccccccc................ccccccccc..........................................
    .....................................................ccccccc......ccccc.............cccccccc.................cccccccc...........................................
    .....................................................ccccccc......ccccc.............cccccccc.................cccccccc...........................................
    .....................................................ccccccc......ccccc.............cccccccc.................cccccccc...........................................
    .....................................................ccccccc......ccccc.............cccccccc.................cccccccc...........................................
    .....................................................ccccccc......ccccc.............cccccccc.................cccccccc...........................................
    .....................................................ccccccc......ccccc.............cccccccc.................cccccccc...........................................
    `],
500,
true
)
intro = true
mySprite = sprites.create(img`
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ....................c...........................................................................................................................................
    ...................c7c..........................................................................................................................................
    ...................c77c.........................................................................................................................................
    ...................c777c........................................................................................................................................
    ...................c7777c.......................................................................................................................................
    ...................c77777c......................................................................................................................................
    ....................c7777c......................................................................................................................................
    ....................c77777c.....................................................................................................................................
    ....................cbbbbbbc....................................................................................................................................
    ....................cbbbbbbbc....................................................................................................c..............................
    .....................cbbbbbbbc..................................................................................................cc..............................
    .....................cbbbbbbbbc................................................................................................c7c..............................
    .....................cbbbbbbbbbc...............................................................................................c7c..............................
    .....................cbbbbbbbbbbc.............................................................................................c77c..............................
    .....................cbbbbbbbbbbc............................................................................................c777c..............................
    ......................cbbbbbbbbbbc..........................................................................................c777bc..............................
    8888888888888888888888cbbbbbbbbbbbc88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888c777bc888888888888888888888888888888
    8888888888888888888888cbbbbbbbbbbbbc888888888888888888888888888888888888888888888888888888888888888888888888888888888888888c777bbc888888888888888888888888888888
    8888888888888888888888cbbbbbbbbbbbbbc8888888888888888888888888888888888888888888888888888888888888888888888888888888888888c7777bbc888888888888888888888888888888
    8888888888888888888888cbbbbbbbbbbbbbbc888888888888888888888888888888888888888888888888888888888888888888888888888888888888c777bbbc888888888888888888888888888888
    88888888888888888888888cbbbbbbbbbbbbbbc8888888888888888888888888888888888888888888888888888888888888888888888888888888888c777bbbbc888888888888888888888888888888
    88888888888888888888888cbbbbbbbbbbbbbbbc88888888888888888888888888888888888888888888888888888888888888888888888888888888cbbbbbbbc8888888888888888888888888888888
    88888888888888888888888cbbbbbbbbbbbbbbbbc8888888888888888888888888888888888888888888888888888888888888888888888888888888cbbbbbbbc8888888888888888888888888888888
    88888888888888888888888cbbbbbbbbbbbbbbbbbc88888888888888888888888888888888888888888888888888888888888888888888888888888cbbbbbbbbc8888888888888888888888888888888
    88888888888888888888888cbbbbbbbbbbbbbbbbbbc888888888888888888888888888888888888888888888888888888888888888888888888888cbbbbbbbbbc8888888888888888888888888888888
    888888888888888888888888cbbbbbbbbbbbbbbbbbbc8888888888888888888888888888888888888888888888888888888888888888888888888cbbbbbbbbbbc8888888888888888888888888888888
    888888888888888888888888cbbbbbbbbbbbbbbbbbbc8888888888888888888888888888888888888888888888888888888888888888888888888cbbbbbbbbbbc8888888888888888888888888888888
    888888888888888888888888cbbbbbbbbbbbbbbbbbbbc88888888888888888888888888888888888888888888888888888888888888888888888cbbbbbbbbbbbc8888888888888888888888888888888
    888888888888888888888888cbbbbbbbbbbbbbbbbbbbbc888888888888888888888888888888888888888888888888888888888888888888888cbbbbbbbbbbbbc8888888888888888888888888888888
    8888888888888888888888888cbbbbbbbbbbbbbbbbbbbbc8888888888888888888888888888888888888888888888888888888888888888888cbbbbbbbbbbbbbc8888888888888888888888888888888
    8888888888888888888888888cbbbbbbbbbbbbbbbbbbbbbc888888888888888888888888888888888888888888888888888888888888888888cbbbbbbbbbbbbbc8888888888888888888888888888888
    8888888888888888888888888cbbbbbbbbbbbbbbbbbbbbbbc8888888888888888888888888888888888888888888888888888888888888888cbbbbbbbbbbbbbbc8888888888888888888888888888888
    8888888888888888888888888cbbbbbbccbbbbccbbbbccccc888888888888888888888888888888888888888888888888888888888888888cbbbbbbbbbbbbbbc88888888888888888888888888888888
    8888888888888888888888888ccbbbbccccbbc88ccbcc88cc88888888888888888888888888888888888888888888888888888888888888cbbbbbbbbbbbbbbbc88888888888888888888888888888888
    88888888888888888888888888cccccc888cc8888ccc8888c88888888888888888888888888888888888888888888888888888888888888cbbbbbbbbbbbbbbbc88888888888888888888888888888888
    88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888cbbbbbbbbbbbbbbbbc88888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888cbbbbbbbbbbbbbbbbbc88888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888cbbbbbbbbbbbbbbbbbc88888888888888888888888888888888
    888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888cbbbbbbbbbbbbbbbbbbc88888888888888888888888888888888
    88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888cbbbbbbbbbbbbbbbbbbbc88888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888cbbbbbbbbbbbbbbbbbbbbc88888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888cbbbbbbbbbbbbbbbbbbbbc88888888888888888888888888888888
    888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888cbbbbbbbbbbbbbbbbbbbbc888888888888888888888888888888888
    888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888cbbbbbbccccbbbbbbbbbbc888888888888888888888888888888888
    888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888cbbbbcc888ccbbbbbbbbbc888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888ccccc88888ccbbbbbbbbc888888888888888888888888888888888
    888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888cccbbbbbbc888888888888888888888888888888888
    888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888ccbbbbc888888888888888888888888888888888
    88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888ccccc888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    888888888888888888888888888888888888888888888888888888888888888888888888888888888888888c888888888888888888888888888888888888888888888888888888888888888888888888
    88888888888888888888888888888888888888888888888888888888888888888888888888888888888888c8888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    `, SpriteKind.Bakeground)
mySprite.z = -3
allllevelpice = sprites.allOfKind(SpriteKind.levelpice)
let lagtest = false
zoom3 = false
zoom2 = false
levelslishthreebravedogs = [
tilemap`level4`,
tilemap`level8`,
tilemap`level11`,
tilemap`level12`,
tilemap`level13`,
tilemap`level14`,
tilemap`level16`,
tilemap`level17`,
tilemap`level19`,
tilemap`level20`,
tilemap`level21`,
tilemap`level22`,
tilemap`level24`,
tilemap`level26`,
tilemap`level27`,
tilemap`level28`,
tilemap`level64`,
tilemap`level65`,
tilemap`level66`,
tilemap`level67`
]
game.onUpdate(function () {
    if (game_on) {
        for (let value of sprites.allOfKind(SpriteKind.Player)) {
            if (sprites.readDataNumber(value, "hp") == 7) {
                sprites.readDataSprite(value, "hpim").setImage(img`
                    . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . 
                    f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f 
                    f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f 
                    . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . 
                    . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . 
                    `)
            } else if (sprites.readDataNumber(value, "hp") == 6) {
                sprites.readDataSprite(value, "hpim").setImage(img`
                    . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . . . . . 
                    f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . . . . . . 
                    f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . . . . . . 
                    . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . . . . . 
                    . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . . . . 
                    `)
            } else if (sprites.readDataNumber(value, "hp") == 5) {
                sprites.readDataSprite(value, "hpim").setImage(img`
                    . . . . . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . . . . . 
                    . . . . . . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . . . . . . 
                    . . . . . . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . . . . . . 
                    . . . . . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . . . . . 
                    . . . . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . . . . 
                    `)
            } else if (sprites.readDataNumber(value, "hp") == 4) {
                sprites.readDataSprite(value, "hpim").setImage(img`
                    . . . . . . . . . . . . . f . f . . . f . f . . . f . f . . . f . f . . . . . . . 
                    . . . . . . . . . . . . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . . . . . . 
                    . . . . . . . . . . . . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . . . . . . 
                    . . . . . . . . . . . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . . . . . 
                    . . . . . . . . . . . . . . f . . . . . f . . . . . f . . . . . f . . . . . . . . 
                    `)
            } else if (sprites.readDataNumber(value, "hp") == 3) {
                sprites.readDataSprite(value, "hpim").setImage(img`
                    . . . . . . . . . . . . . f . f . . . f . f . . . f . f . . . . . . . . . . . . . 
                    . . . . . . . . . . . . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . . . . . . . . . . . . 
                    . . . . . . . . . . . . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . . . . . . . . . . . . 
                    . . . . . . . . . . . . . f 2 f . . . f 2 f . . . f 2 f . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . f . . . . . f . . . . . f . . . . . . . . . . . . . . 
                    `)
            } else if (sprites.readDataNumber(value, "hp") == 2) {
                sprites.readDataSprite(value, "hpim").setImage(img`
                    . . . . . . . . . . . . . . . . . . . f . f . . . f . f . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . . . f 2 f 2 f . f 2 f 2 f . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . . . f 2 2 2 f . f 2 2 2 f . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . . . . f 2 f . . . f 2 f . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . . . . . f . . . . . f . . . . . . . . . . . . . . 
                    `)
            } else if (sprites.readDataNumber(value, "hp") == 1) {
                sprites.readDataSprite(value, "hpim").setImage(img`
                    . . . . . . . . . . . . . . . . . . . f . f . . . . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . . . f 2 f 2 f . . . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . . . f 2 2 2 f . . . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . . . . f 2 f . . . . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . . . . . f . . . . . . . . . . . . . . . . . . . . 
                    `)
            } else if (sprites.readDataNumber(value, "hp") == 0) {
                game.over(false)
            }
            sprites.readDataSprite(value, "hpim").x = value.x
            sprites.readDataSprite(value, "hpim").y = value.y - 8
        }
        for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
            if (sprites.readDataNumber(value, "hp") == 7) {
                sprites.readDataSprite(value, "hpim").setImage(img`
                    . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . 
                    f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f 
                    f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f 
                    . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . 
                    . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . 
                    `)
            } else if (sprites.readDataNumber(value, "hp") == 6) {
                sprites.readDataSprite(value, "hpim").setImage(img`
                    . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . . . . . 
                    f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . . . . . . 
                    f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . . . . . . 
                    . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . . . . . 
                    . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . . . . 
                    `)
            } else if (sprites.readDataNumber(value, "hp") == 5) {
                sprites.readDataSprite(value, "hpim").setImage(img`
                    . . . . . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . . . . . 
                    . . . . . . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . . . . . . 
                    . . . . . . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . . . . . . 
                    . . . . . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . . . . . 
                    . . . . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . . . . 
                    `)
            } else if (sprites.readDataNumber(value, "hp") == 4) {
                sprites.readDataSprite(value, "hpim").setImage(img`
                    . . . . . . . . . . . . . f . f . . . f . f . . . f . f . . . f . f . . . . . . . 
                    . . . . . . . . . . . . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . . . . . . 
                    . . . . . . . . . . . . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . . . . . . 
                    . . . . . . . . . . . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . . . . . 
                    . . . . . . . . . . . . . . f . . . . . f . . . . . f . . . . . f . . . . . . . . 
                    `)
            } else if (sprites.readDataNumber(value, "hp") == 3) {
                sprites.readDataSprite(value, "hpim").setImage(img`
                    . . . . . . . . . . . . . f . f . . . f . f . . . f . f . . . . . . . . . . . . . 
                    . . . . . . . . . . . . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . . . . . . . . . . . . 
                    . . . . . . . . . . . . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . . . . . . . . . . . . 
                    . . . . . . . . . . . . . f 2 f . . . f 2 f . . . f 2 f . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . f . . . . . f . . . . . f . . . . . . . . . . . . . . 
                    `)
            } else if (sprites.readDataNumber(value, "hp") == 2) {
                sprites.readDataSprite(value, "hpim").setImage(img`
                    . . . . . . . . . . . . . . . . . . . f . f . . . f . f . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . . . f 2 f 2 f . f 2 f 2 f . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . . . f 2 2 2 f . f 2 2 2 f . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . . . . f 2 f . . . f 2 f . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . . . . . f . . . . . f . . . . . . . . . . . . . . 
                    `)
            } else if (sprites.readDataNumber(value, "hp") == 1) {
                sprites.readDataSprite(value, "hpim").setImage(img`
                    . . . . . . . . . . . . . . . . . . . f . f . . . . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . . . f 2 f 2 f . . . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . . . f 2 2 2 f . . . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . . . . f 2 f . . . . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . . . . . f . . . . . . . . . . . . . . . . . . . . 
                    `)
            } else if (sprites.readDataNumber(value, "hp") == 8) {
                sprites.readDataSprite(value, "hpim").setImage(img`
                    . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . 
                    f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f 
                    f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f 
                    . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . 
                    . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . 
                    `)
            } else if (sprites.readDataNumber(value, "hp") == 9) {
                sprites.readDataSprite(value, "hpim").setImage(img`
                    . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . 
                    f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f 
                    f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f 
                    . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . 
                    . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . 
                    `)
            }
            sprites.readDataSprite(value, "hpim").x = value.x
            if (sprites.readDataNumber(value, "type") == 4) {
                sprites.readDataSprite(value, "hpim").y = value.y - 16
            } else if (sprites.readDataNumber(value, "type") == 20) {
                sprites.readDataSprite(value, "hpim").y = value.y - 16
            } else if (sprites.readDataNumber(value, "type") == 21) {
                sprites.readDataSprite(value, "hpim").y = value.y - 22
            } else {
                sprites.readDataSprite(value, "hpim").y = value.y - 8
            }
        }
        for (let value of sprites.allOfKind(SpriteKind.NPC)) {
            if (sprites.readDataNumber(value, "hp") == 7) {
                sprites.readDataSprite(value, "hpim").setImage(img`
                    . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . 
                    f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f 
                    f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f 
                    . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . 
                    . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . 
                    `)
            } else if (sprites.readDataNumber(value, "hp") == 6) {
                sprites.readDataSprite(value, "hpim").setImage(img`
                    . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . . . . . 
                    f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . . . . . . 
                    f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . . . . . . 
                    . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . . . . . 
                    . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . . . . 
                    `)
            } else if (sprites.readDataNumber(value, "hp") == 5) {
                sprites.readDataSprite(value, "hpim").setImage(img`
                    . . . . . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . . . . . 
                    . . . . . . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . . . . . . 
                    . . . . . . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . . . . . . 
                    . . . . . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . . . . . 
                    . . . . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . . . . 
                    `)
            } else if (sprites.readDataNumber(value, "hp") == 4) {
                sprites.readDataSprite(value, "hpim").setImage(img`
                    . . . . . . . . . . . . . f . f . . . f . f . . . f . f . . . f . f . . . . . . . 
                    . . . . . . . . . . . . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . . . . . . 
                    . . . . . . . . . . . . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . . . . . . 
                    . . . . . . . . . . . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . . . . . 
                    . . . . . . . . . . . . . . f . . . . . f . . . . . f . . . . . f . . . . . . . . 
                    `)
            } else if (sprites.readDataNumber(value, "hp") == 3) {
                sprites.readDataSprite(value, "hpim").setImage(img`
                    . . . . . . . . . . . . . f . f . . . f . f . . . f . f . . . . . . . . . . . . . 
                    . . . . . . . . . . . . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . . . . . . . . . . . . 
                    . . . . . . . . . . . . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . . . . . . . . . . . . 
                    . . . . . . . . . . . . . f 2 f . . . f 2 f . . . f 2 f . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . f . . . . . f . . . . . f . . . . . . . . . . . . . . 
                    `)
            } else if (sprites.readDataNumber(value, "hp") == 2) {
                sprites.readDataSprite(value, "hpim").setImage(img`
                    . . . . . . . . . . . . . . . . . . . f . f . . . f . f . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . . . f 2 f 2 f . f 2 f 2 f . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . . . f 2 2 2 f . f 2 2 2 f . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . . . . f 2 f . . . f 2 f . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . . . . . f . . . . . f . . . . . . . . . . . . . . 
                    `)
            } else if (sprites.readDataNumber(value, "hp") == 1) {
                sprites.readDataSprite(value, "hpim").setImage(img`
                    . . . . . . . . . . . . . . . . . . . f . f . . . . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . . . f 2 f 2 f . . . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . . . f 2 2 2 f . . . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . . . . f 2 f . . . . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . . . . . f . . . . . . . . . . . . . . . . . . . . 
                    `)
            } else if (sprites.readDataNumber(value, "hp") <= 0) {
                value.destroy()
            }
            sprites.readDataSprite(value, "hpim").x = value.x
            sprites.readDataSprite(value, "hpim").y = value.y - 8
        }
    }
})
game.onUpdate(function () {
    Zoom.SetZoomFilter(zoom)
})
forever(function () {
    for (let value of sprites.allOfKind(SpriteKind.Player)) {
        if (value.tileKindAt(TileDirection.Center, assets.tile`myTile40`)) {
            if (levelnublucasM == 0) {
                value.sayText("Ues a button to jump and B to shoot stuff")
            } else if (levelnublucasM == 6) {
                value.sayText("THIs IsN't A sHorT CUT ?!?")
            }
            while (value.tileKindAt(TileDirection.Center, assets.tile`myTile40`)) {
                pause(1)
            }
        } else if (value.tileKindAt(TileDirection.Center, assets.tile`myTile54`)) {
            value.sayText("Checkpoint")
            blockSettings.writeNumber("checkpoint", levelnublucasM)
            while (value.tileKindAt(TileDirection.Center, assets.tile`myTile54`)) {
                pause(1)
            }
        } else if (value.tileKindAt(TileDirection.Center, assets.tile`myTile51`)) {
            value.sayText("You also might see some new enmayes ")
            while (value.tileKindAt(TileDirection.Center, assets.tile`myTile51`)) {
                pause(1)
            }
        } else {
            value.sayText("", 1, false)
        }
    }
})
forever(function () {
    for (let value of sprites.allOfKind(SpriteKind.Player)) {
        windmovething(value)
    }
    for (let value of sprites.allOfKind(SpriteKind.NPCTalk)) {
        windmovething(value)
    }
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        windmovething(value)
    }
    for (let value of sprites.allOfKind(SpriteKind.Projectile)) {
        windmovething(value)
    }
})
forever(function () {
    for (let value of sprites.allOfKind(SpriteKind.Player)) {
        if (value.tileKindAt(TileDirection.Center, assets.tile`myTile55`)) {
            endlevel()
        } else if (value.tileKindAt(TileDirection.Center, assets.tile`myTile80`)) {
            sprites.changeDataNumberBy(value, "hp", 1)
            tiles.setTileAt(value.tilemapLocation(), assets.tile`transparency16`)
        } else if (value.tileKindAt(TileDirection.Center, assets.tile`myTile89`)) {
            game.over(false)
        }
        if (value.isHittingTile(CollisionDirection.Bottom)) {
            sprites.setDataBoolean(value, "D", true)
        }
        for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
            if (value.tileKindAt(TileDirection.Center, assets.tile`myTile89`)) {
                value.destroy()
                sprites.readDataSprite(value, "hpim").destroy()
                if (sprites.readDataNumber(value, "type") == 4) {
                    for (let _2v of tiles.getTilesByType(assets.tile`myTile70`)) {
                        tiles.setWallAt(_2v, false)
                    }
                    tileUtil.coverAllTiles(assets.tile`myTile70`, assets.tile`transparency16`)
                    tileUtil.replaceAllTiles(assets.tile`myTile70`, assets.tile`transparency16`)
                }
            }
        }
    }
})
forever(function () {
    for (let value of sprites.allOfKind(SpriteKind.Player)) {
        NPCTalking(value)
        if (value.tileKindAt(TileDirection.Center, assets.tile`myTile45`)) {
            sprites.changeDataNumberBy(value, "hp", -1)
            music.powerDown.play()
            if (zoom2) {
                zoom += 1
                timer.after(5000, function () {
                    zoom += -1
                })
            }
            pause(1000)
        }
        if (value.tileKindAt(TileDirection.Center, assets.tile`myTile100`)) {
            sprites.changeDataNumberBy(value, "hp", -1)
            music.powerDown.play()
            if (zoom2) {
                zoom += 1
                timer.after(5000, function () {
                    zoom += -1
                })
            }
            pause(1000)
        }
    }
    for (let value of sprites.allOfKind(SpriteKind.NPC)) {
        if (value.tileKindAt(TileDirection.Center, assets.tile`myTile45`)) {
            sprites.changeDataNumberBy(value, "hp", -1)
            music.powerDown.play()
            pause(1000)
        }
        if (value.tileKindAt(TileDirection.Center, assets.tile`myTile100`)) {
            sprites.changeDataNumberBy(value, "hp", -1)
            music.powerDown.play()
            pause(1000)
        }
    }
})
forever(function () {
    for (let value of tiles.getTilesByType(assets.tile`myTile98`)) {
        radom_14 = randint(1, 4)
        if (radom_14 == 1) {
            if (tiles.tileAtLocationIsWall(value.getNeighboringLocation(CollisionDirection.Left))) {
                tiles.setTileAt(value.getNeighboringLocation(CollisionDirection.Left), assets.tile`myTile98`)
            } else {
                tiles.setTileAt(value.getNeighboringLocation(CollisionDirection.Left), assets.tile`myTile99`)
            }
        } else if (radom_14 == 2) {
            if (tiles.tileAtLocationIsWall(value.getNeighboringLocation(CollisionDirection.Right))) {
                tiles.setTileAt(value.getNeighboringLocation(CollisionDirection.Right), assets.tile`myTile98`)
            } else {
                tiles.setTileAt(value.getNeighboringLocation(CollisionDirection.Right), assets.tile`myTile99`)
            }
        } else if (radom_14 == 3) {
            if (tiles.tileAtLocationIsWall(value.getNeighboringLocation(CollisionDirection.Top))) {
                tiles.setTileAt(value.getNeighboringLocation(CollisionDirection.Top), assets.tile`myTile98`)
            } else {
                tiles.setTileAt(value.getNeighboringLocation(CollisionDirection.Top), assets.tile`myTile99`)
            }
        } else if (radom_14 == 4) {
            if (tiles.tileAtLocationIsWall(value.getNeighboringLocation(CollisionDirection.Top))) {
                tiles.setTileAt(value.getNeighboringLocation(CollisionDirection.Bottom), assets.tile`myTile98`)
            } else {
                tiles.setTileAt(value.getNeighboringLocation(CollisionDirection.Bottom), assets.tile`myTile99`)
            }
        }
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile99`)) {
        radom_14 = randint(1, 4)
        if (radom_14 == 1) {
            if (tiles.tileAtLocationIsWall(value.getNeighboringLocation(CollisionDirection.Left))) {
                tiles.setTileAt(value.getNeighboringLocation(CollisionDirection.Left), assets.tile`myTile98`)
            } else {
                tiles.setTileAt(value.getNeighboringLocation(CollisionDirection.Left), assets.tile`myTile99`)
            }
        } else if (radom_14 == 2) {
            if (tiles.tileAtLocationIsWall(value.getNeighboringLocation(CollisionDirection.Right))) {
                tiles.setTileAt(value.getNeighboringLocation(CollisionDirection.Right), assets.tile`myTile98`)
            } else {
                tiles.setTileAt(value.getNeighboringLocation(CollisionDirection.Right), assets.tile`myTile99`)
            }
        } else if (radom_14 == 3) {
            if (tiles.tileAtLocationIsWall(value.getNeighboringLocation(CollisionDirection.Top))) {
                tiles.setTileAt(value.getNeighboringLocation(CollisionDirection.Top), assets.tile`myTile98`)
            } else {
                tiles.setTileAt(value.getNeighboringLocation(CollisionDirection.Top), assets.tile`myTile99`)
            }
        } else if (radom_14 == 4) {
            if (tiles.tileAtLocationIsWall(value.getNeighboringLocation(CollisionDirection.Top))) {
                tiles.setTileAt(value.getNeighboringLocation(CollisionDirection.Bottom), assets.tile`myTile98`)
            } else {
                tiles.setTileAt(value.getNeighboringLocation(CollisionDirection.Bottom), assets.tile`myTile99`)
            }
        }
    }
    pause(randint(100, 5000))
})
forever(function () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        if (sprites.readDataNumber(value, "type") == 4) {
            if (tiles.tileAtLocationIsWall(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Left))) {
                value.vx = 110
            }
            if (tiles.tileAtLocationIsWall(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Right))) {
                value.vx = -110
            }
            if (!(tiles.tileAtLocationIsWall(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Right).getNeighboringLocation(CollisionDirection.Bottom))) && !(tiles.tileAtLocationIsWall(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Right)))) {
                value.vx = -110
            }
            if (!(tiles.tileAtLocationIsWall(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Left).getNeighboringLocation(CollisionDirection.Bottom))) && !(tiles.tileAtLocationIsWall(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Left)))) {
                value.vx = 110
            }
        }
        if (sprites.readDataNumber(value, "type") == 2) {
            if (tiles.tileAtLocationIsWall(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Left))) {
                value.vx = 50
            }
            if (tiles.tileAtLocationIsWall(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Right))) {
                value.vx = -50
            }
            if (!(tiles.tileAtLocationIsWall(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Right).getNeighboringLocation(CollisionDirection.Bottom))) && !(tiles.tileAtLocationIsWall(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Right)))) {
                value.vx = -50
            }
            if (!(tiles.tileAtLocationIsWall(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Left).getNeighboringLocation(CollisionDirection.Bottom))) && !(tiles.tileAtLocationIsWall(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Left)))) {
                value.vx = 50
            }
        }
        if (sprites.readDataNumber(value, "type") == 3) {
            if (spriteutils.distanceBetween(Player_1, value) <= scene.screenWidth()) {
                value.follow(Player_1, 50)
                value.setFlag(SpriteFlag.GhostThroughWalls, true)
            }
        }
        if (sprites.readDataNumber(value, "type") == 20) {
            if (spriteutils.distanceBetween(Player_1, value) <= scene.screenWidth()) {
                timer.throttle("Ghost", 5000, function () {
                    for (let index = 0; index < randint(1, 4); index++) {
                        enty = sprites.create(img`
                            . . . . . . . . . . . . . . . . 
                            . . c c c c c c c c c c c . . . 
                            . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
                            . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
                            . c 1 c c 1 c c 1 1 1 1 1 c . . 
                            . c 1 c c 1 c c 1 1 1 1 1 c . . 
                            . c 1 c c 1 c c 1 1 1 1 1 c . . 
                            . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
                            . c 1 1 1 c c 1 1 1 1 1 1 c . . 
                            . c 1 1 c c c 1 1 1 1 1 1 c . . 
                            . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
                            . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
                            . c c c c c c c c c 1 1 c c . . 
                            . . c 1 c 1 c . . c 1 1 c . . . 
                            . . c c c c c . . c c 1 c . . . 
                            . . . . . . . . . . c c c . . . 
                            `, SpriteKind.Enemy)
                        characterAnimations.loopFrames(
                        enty,
                        [img`
                            . . . . . . . . . . . . . . . . 
                            . . c c c c c c c c c c c . . . 
                            . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
                            . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
                            . c 1 c c 1 c c 1 1 1 1 1 c . . 
                            . c 1 c c 1 c c 1 1 1 1 1 c . . 
                            . c 1 c c 1 c c 1 1 1 1 1 c . . 
                            . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
                            . c 1 1 1 c c 1 1 1 1 1 1 c . . 
                            . c 1 1 c c c 1 1 1 1 1 1 c . . 
                            . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
                            . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
                            . c c c c c c c c c 1 1 c c . . 
                            . . c 1 c 1 c . . c 1 1 c . . . 
                            . . c c c c c . . c c 1 c . . . 
                            . . . . . . . . . . c c c . . . 
                            `,img`
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . c c c c c c c c c c c . . . 
                            . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
                            . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
                            . c 1 c c 1 c c 1 1 1 1 1 c . . 
                            . c 1 c c 1 c c 1 1 1 1 1 c . . 
                            . c 1 c c 1 c c 1 1 1 1 1 c . . 
                            . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
                            . c 1 1 1 c c 1 1 1 1 1 1 c . . 
                            . c 1 1 c c c 1 1 1 1 1 1 c . . 
                            . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
                            . c c c c c c c c c 1 1 c c . . 
                            . . c 1 c 1 c . . c 1 1 c . . . 
                            . . c c c c c . . c c 1 c . . . 
                            . . . . . . . . . . c c c . . . 
                            `],
                        500,
                        characterAnimations.rule(Predicate.FacingLeft)
                        )
                        characterAnimations.loopFrames(
                        enty,
                        [img`
                            . . . . . . . . . . . . . . . . 
                            . . c c c c c c c c c c c . . . 
                            . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
                            . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
                            . c 1 1 1 1 1 c c 1 c c 1 c . . 
                            . c 1 1 1 1 1 c c 1 c c 1 c . . 
                            . c 1 1 1 1 1 c c 1 c c 1 c . . 
                            . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
                            . c 1 1 1 1 1 1 c c 1 1 1 c . . 
                            . c 1 1 1 1 1 1 c c c 1 1 c . . 
                            . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
                            . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
                            . c c 1 1 c c c c c c c c c . . 
                            . . c 1 1 c . . c 1 c 1 c . . . 
                            . . c 1 c c . . c c c c c . . . 
                            . . c c c . . . . . . . . . . . 
                            `,img`
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . c c c c c c c c c c c . . . 
                            . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
                            . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
                            . c 1 1 1 1 1 c c 1 c c 1 c . . 
                            . c 1 1 1 1 1 c c 1 c c 1 c . . 
                            . c 1 1 1 1 1 c c 1 c c 1 c . . 
                            . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
                            . c 1 1 1 1 1 1 c c 1 1 1 c . . 
                            . c 1 1 1 1 1 1 c c c 1 1 c . . 
                            . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
                            . c c 1 1 c c c c c c c c c . . 
                            . . c 1 1 c . . c 1 c 1 c . . . 
                            . . c 1 c c . . c c c c c . . . 
                            . . c c c . . . . . . . . . . . 
                            `],
                        500,
                        characterAnimations.rule(Predicate.FacingRight)
                        )
                        enty.ay = 200
                        sprites.setDataBoolean(enty, "move", false)
                        sprites.setDataNumber(enty, "hp", 3)
                        sprites.setDataSprite(enty, "hpim", sprites.create(img`
                            . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . 
                            f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f 
                            f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f 
                            . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . 
                            . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . 
                            `, SpriteKind.hp))
                        sprites.readDataSprite(enty, "hpim").setFlag(SpriteFlag.Ghost, true)
                        sprites.setDataNumber(enty, "type", 3)
                        enty.setPosition(value.x + randint(-10, 10), value.y + randint(-10, 10))
                    }
                })
            }
        }
        if (sprites.readDataNumber(value, "type") == 21) {
            if (spriteutils.distanceBetween(Player_1, value) <= scene.screenWidth()) {
                timer.throttle("axe", 1000, function () {
                    for (let index = 0; index < randint(1, 4); index++) {
                        enty = sprites.create(img`
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . c e . . 
                            . . . . . . . . . . . . b e . . 
                            . . . . . . . . . . . b b . . . 
                            . . . . . . . . . . b b b b b b 
                            . . . . . . . . . c d b b b b b 
                            . . . . . . . . c e . d b b b b 
                            . . . . . . . c e . . d d b b . 
                            . . . . . . c e . . . d d d . . 
                            . . . . . c e . . . . . . . . . 
                            . . . . c e . . . . . . . . . . 
                            . . . c e . . . . . . . . . . . 
                            . . c e . . . . . . . . . . . . 
                            . c e . . . . . . . . . . . . . 
                            c e . . . . . . . . . . . . . . 
                            e . . . . . . . . . . . . . . . 
                            `, SpriteKind.EP_NOTTHEMUCISTIME)
                        characterAnimations.loopFrames(
                        enty,
                        [img`
                            . . . . . . . . . . . . . . . . 
                            . . e c 1 1 1 1 1 1 1 1 1 1 . . 
                            . . e b 1 1 1 1 1 1 1 1 1 1 . . 
                            . . . b b 1 1 1 1 1 1 1 1 1 1 . 
                            b b b b b b 1 1 1 1 1 1 1 1 1 . 
                            b b b b b d c . . . 1 1 1 1 1 . 
                            b b b b d . e c . . . . . 1 1 . 
                            . b b d d . . e c . . . . . . . 
                            . . d d d . . . e c . . . . . . 
                            . . . . . . . . . e c . . . . . 
                            . . . . . . . . . . e c . . . . 
                            . . . . . . . . . . . e c . . . 
                            . . . . . . . . . . . . e c . . 
                            . . . . . . . . . . . . . e c . 
                            . . . . . . . . . . . . . . e c 
                            . . . . . . . . . . . . . . . e 
                            `,img`
                            . . . . . . . . . . . . . . c e 
                            . . . 1 1 1 1 . . . . . . c e . 
                            . 1 1 1 1 1 1 . . . . . c e . . 
                            . 1 1 1 1 1 . . . . . c e . . . 
                            . 1 1 1 1 1 . . . . c e . . . . 
                            . 1 1 1 1 1 . . . c e . . . . . 
                            . 1 1 1 1 . . . c e . . . . . . 
                            . 1 1 1 1 . . c e . . . . . . . 
                            . 1 1 1 1 . c e . . . . . . . . 
                            . 1 1 1 1 c e . . . . . . . . . 
                            . 1 1 1 b d . . . . . . . . . . 
                            . 1 1 b b b d d d . . . . . . . 
                            . c b b b b b d d . . . . . . . 
                            . e e . b b b b d . . . . . . . 
                            . . . . b b b b . . . . . . . . 
                            . . . . b b b . . . . . . . . . 
                            `,img`
                            e . . . . . . . . . . . . . . . 
                            c e . . . . . . . . . . . . . . 
                            . c e . . . . . . . . . . . . . 
                            . . c e . . . . . . . . . . . . 
                            . . . c e . . . . . . . . . . . 
                            . . . . c e . . . . . . . . . . 
                            . . . . . c e . . . . . . . . . 
                            . . . . . . c e . . . d d d . . 
                            . . . . . . . c e . . d d b b . 
                            . 1 1 . . . . . c e . d b b b b 
                            . 1 1 1 1 1 . . . c d b b b b b 
                            . 1 1 1 1 1 1 1 1 1 b b b b b b 
                            . 1 1 1 1 1 1 1 1 1 1 b b . . . 
                            . . 1 1 1 1 1 1 1 1 1 1 b e . . 
                            . . 1 1 1 1 1 1 1 1 1 1 c e . . 
                            . . . . . . . . . . . . . . . . 
                            `,img`
                            . . . . . . . . . b b b . . . . 
                            . . . . . . . . b b b b . . . . 
                            . . . . . . . d b b b b . e e . 
                            . . . . . . . d d b b b b b c . 
                            . . . . . . . d d d b b b 1 1 . 
                            . . . . . . . . . . d b 1 1 1 . 
                            . . . . . . . . . e c 1 1 1 1 . 
                            . . . . . . . . e c . 1 1 1 1 . 
                            . . . . . . . e c . . 1 1 1 1 . 
                            . . . . . . e c . . . 1 1 1 1 . 
                            . . . . . e c . . . 1 1 1 1 1 . 
                            . . . . e c . . . . 1 1 1 1 1 . 
                            . . . e c . . . . . 1 1 1 1 1 . 
                            . . e c . . . . . 1 1 1 1 1 1 . 
                            . e c . . . . . . 1 1 1 1 . . . 
                            e c . . . . . . . . . . . . . . 
                            `],
                        100,
                        characterAnimations.rule(Predicate.FacingLeft)
                        )
                        characterAnimations.loopFrames(
                        enty,
                        [img`
                            . . . . . . . . . . . . . . . . 
                            . . 1 1 1 1 1 1 1 1 1 1 c e . . 
                            . . 1 1 1 1 1 1 1 1 1 1 b e . . 
                            . 1 1 1 1 1 1 1 1 1 1 b b . . . 
                            . 1 1 1 1 1 1 1 1 1 b b b b b b 
                            . 1 1 1 1 1 . . . c d b b b b b 
                            . 1 1 . . . . . c e . d b b b b 
                            . . . . . . . c e . . d d b b . 
                            . . . . . . c e . . . d d d . . 
                            . . . . . c e . . . . . . . . . 
                            . . . . c e . . . . . . . . . . 
                            . . . c e . . . . . . . . . . . 
                            . . c e . . . . . . . . . . . . 
                            . c e . . . . . . . . . . . . . 
                            c e . . . . . . . . . . . . . . 
                            e . . . . . . . . . . . . . . . 
                            `,img`
                            e c . . . . . . . . . . . . . . 
                            . e c . . . . . . 1 1 1 1 . . . 
                            . . e c . . . . . 1 1 1 1 1 1 . 
                            . . . e c . . . . . 1 1 1 1 1 . 
                            . . . . e c . . . . 1 1 1 1 1 . 
                            . . . . . e c . . . 1 1 1 1 1 . 
                            . . . . . . e c . . . 1 1 1 1 . 
                            . . . . . . . e c . . 1 1 1 1 . 
                            . . . . . . . . e c . 1 1 1 1 . 
                            . . . . . . . . . e c 1 1 1 1 . 
                            . . . . . . . . . . d b 1 1 1 . 
                            . . . . . . . d d d b b b 1 1 . 
                            . . . . . . . d d b b b b b c . 
                            . . . . . . . d b b b b . e e . 
                            . . . . . . . . b b b b . . . . 
                            . . . . . . . . . b b b . . . . 
                            `,img`
                            . . . . . . . . . . . . . . . e 
                            . . . . . . . . . . . . . . e c 
                            . . . . . . . . . . . . . e c . 
                            . . . . . . . . . . . . e c . . 
                            . . . . . . . . . . . e c . . . 
                            . . . . . . . . . . e c . . . . 
                            . . . . . . . . . e c . . . . . 
                            . . d d d . . . e c . . . . . . 
                            . b b d d . . e c . . . . . . . 
                            b b b b d . e c . . . . . 1 1 . 
                            b b b b b d c . . . 1 1 1 1 1 . 
                            b b b b b b 1 1 1 1 1 1 1 1 1 . 
                            . . . b b 1 1 1 1 1 1 1 1 1 1 . 
                            . . e b 1 1 1 1 1 1 1 1 1 1 . . 
                            . . e c 1 1 1 1 1 1 1 1 1 1 . . 
                            . . . . . . . . . . . . . . . . 
                            `,img`
                            . . . . b b b . . . . . . . . . 
                            . . . . b b b b . . . . . . . . 
                            . e e . b b b b d . . . . . . . 
                            . c b b b b b d d . . . . . . . 
                            . 1 1 b b b d d d . . . . . . . 
                            . 1 1 1 b d . . . . . . . . . . 
                            . 1 1 1 1 c e . . . . . . . . . 
                            . 1 1 1 1 . c e . . . . . . . . 
                            . 1 1 1 1 . . c e . . . . . . . 
                            . 1 1 1 1 . . . c e . . . . . . 
                            . 1 1 1 1 1 . . . c e . . . . . 
                            . 1 1 1 1 1 . . . . c e . . . . 
                            . 1 1 1 1 1 . . . . . c e . . . 
                            . 1 1 1 1 1 1 . . . . . c e . . 
                            . . . 1 1 1 1 . . . . . . c e . 
                            . . . . . . . . . . . . . . c e 
                            `],
                        100,
                        characterAnimations.rule(Predicate.FacingRight)
                        )
                        enty.setPosition(value.x + randint(-10, 10), value.y + randint(-10, 10))
                        enty.setFlag(SpriteFlag.BounceOnWall, true)
                        enty.setVelocity(-59, -52)
                        enty.z = 90000
                        enty.ay = 200
                    }
                })
            }
        } else if (sprites.readDataNumber(value, "type") == 22) {
            if (spriteutils.distanceBetween(Player_1, value) <= scene.screenWidth()) {
                value.setImage(img`
                    ........................
                    ........................
                    ........................
                    .......cc.c.............
                    .......ccccccc..........
                    ........ccccccc.........
                    .........fccccc.........
                    .........ff1fcc.........
                    .........ff1f1f.........
                    .........f1111f.........
                    ..........fffff.........
                    .......bbbbcceee........
                    .......cbbbcffeee.......
                    .......ccbbbffeee.......
                    .......ccfffffeee.......
                    .......1cfffffeee.......
                    .......11fffff1ee.......
                    .........fffffcee.......
                    .........cc.cc.ce.......
                    .........cc.bb..........
                    .........bc.cc..........
                    .........cb.cc..........
                    .........cc.cc..........
                    .........bb.bb..........
                    `)
                pause(200)
                value.setImage(img`
                    ........................
                    .......cc.c.............
                    .......ccccccc..........
                    ........ccccccc.........
                    .........fccccc.........
                    .........ff1fcc.........
                    .........ff1f1f.........
                    .........f1111f.........
                    ..........fffff.........
                    ....11cbbbbcceee........
                    ....1cccbbbcffeee.......
                    .........bbbffeee.......
                    .........fffffeee.......
                    .........fffffeee.......
                    .........fffff1ee.......
                    .........fffffcee.......
                    .........cc.cc.ce.......
                    .........cc.bb..........
                    .........bc.cc..........
                    .........cb.cc..........
                    .........cc.cc..........
                    .........bb.bb..........
                    ........................
                    ...........c............
                    `)
                for (let index = 0; index < randint(3, 10); index++) {
                    enty = sprites.create(img`
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . c c . . . . 
                        . . . . . . . . . c b c . . . . 
                        . . . . . . . . c b c . . . . . 
                        . . . . . . . c b c . . . . . . 
                        . . . . . . c b c . . . . . . . 
                        . . . . . c b c . . . . . . . . 
                        . . . . c b c . . . . . . . . . 
                        . . . c c b c . . . . . . . . . 
                        . . c c b c . . . . . . . . . . 
                        . . c e c . . . . . . . . . . . 
                        . c e c . . . . . . . . . . . . 
                        c e c . . . . . . . . . . . . . 
                        e c . . . . . . . . . . . . . . 
                        `, SpriteKind.EP_NOTTHEMUCISTIME)
                    characterAnimations.loopFrames(
                    enty,
                    [img`
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . c c 1 . . 
                        . . . . . . . . . . c b c 1 1 . 
                        . . . . . . . . . c b c 1 1 1 . 
                        . . . . . . . . c b c 1 1 1 1 . 
                        . . . . . . . c b c . 1 1 1 1 . 
                        . . . . . . c b c . . 1 1 1 1 . 
                        . . . . . c b c . . . 1 1 1 1 . 
                        . . . . c c b c . . 1 1 1 1 1 . 
                        . . . c c b c . . . 1 1 1 1 1 . 
                        . . . c e c . . . . 1 1 1 1 1 . 
                        . . c e c . . . . 1 1 1 1 1 . . 
                        . c e c . . . . . 1 1 1 1 . . . 
                        e e c . . . . . . . . . . . . . 
                        `,img`
                        . . . . . . . . . . . . . . . . 
                        . . . . 1 1 1 1 1 1 1 1 1 . . . 
                        . . . 1 1 1 1 1 1 1 1 1 1 1 . . 
                        . . . c c 1 1 1 1 1 1 1 1 1 1 . 
                        . . . c b c 1 1 1 1 1 1 1 1 1 . 
                        . . . . c b c . . . 1 1 1 1 1 . 
                        . . . . . c b c . . . . . 1 1 . 
                        . . . . . . c b c . . . . . . . 
                        . . . . . . . c b c c . . . . . 
                        . . . . . . . . c b b c . . . . 
                        . . . . . . . . . c c b c . . . 
                        . . . . . . . . . . c c e c . . 
                        . . . . . . . . . . . c c e c . 
                        . . . . . . . . . . . . . c e c 
                        . . . . . . . . . . . . . . c e 
                        . . . . . . . . . . . . . . . e 
                        `,img`
                        . . . . . . . . . . . . . c e e 
                        . . . 1 1 1 1 . . . . . c e c . 
                        . . 1 1 1 1 1 . . . . c e c . . 
                        . 1 1 1 1 1 . . . . c e c . . . 
                        . 1 1 1 1 1 . . . c b c c . . . 
                        . 1 1 1 1 1 . . c b c c . . . . 
                        . 1 1 1 1 . . . c b c . . . . . 
                        . 1 1 1 1 . . c b c . . . . . . 
                        . 1 1 1 1 . c b c . . . . . . . 
                        . 1 1 1 1 c b c . . . . . . . . 
                        . 1 1 1 c b c . . . . . . . . . 
                        . 1 1 c b c . . . . . . . . . . 
                        . . 1 c c . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        `,img`
                        e . . . . . . . . . . . . . . . 
                        e c . . . . . . . . . . . . . . 
                        c e c . . . . . . . . . . . . . 
                        . c e c c . . . . . . . . . . . 
                        . . c e c c . . . . . . . . . . 
                        . . . c b c c . . . . . . . . . 
                        . . . . c b b c . . . . . . . . 
                        . . . . . c c b c . . . . . . . 
                        . . . . . . . c b c . . . . . . 
                        . 1 1 . . . . . c b c . . . . . 
                        . 1 1 1 1 1 . . . c b c . . . . 
                        . 1 1 1 1 1 1 1 1 1 c b c . . . 
                        . 1 1 1 1 1 1 1 1 1 1 c c . . . 
                        . . 1 1 1 1 1 1 1 1 1 1 1 . . . 
                        . . . 1 1 1 1 1 1 1 1 1 . . . . 
                        . . . . . . . . . . . . . . . . 
                        `],
                    100,
                    characterAnimations.rule(Predicate.FacingLeft)
                    )
                    characterAnimations.loopFrames(
                    enty,
                    [img`
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . 1 c c . . . . . . . . . . . 
                        . 1 1 c b c . . . . . . . . . . 
                        . 1 1 1 c b c . . . . . . . . . 
                        . 1 1 1 1 c b c . . . . . . . . 
                        . 1 1 1 1 . c b c . . . . . . . 
                        . 1 1 1 1 . . c b c . . . . . . 
                        . 1 1 1 1 . . . c b c . . . . . 
                        . 1 1 1 1 1 . . c b c c . . . . 
                        . 1 1 1 1 1 . . . c b c c . . . 
                        . 1 1 1 1 1 . . . . c e c . . . 
                        . . 1 1 1 1 1 . . . . c e c . . 
                        . . . 1 1 1 1 . . . . . c e c . 
                        . . . . . . . . . . . . . c e e 
                        `,img`
                        . . . . . . . . . . . . . . . . 
                        . . . 1 1 1 1 1 1 1 1 1 . . . . 
                        . . 1 1 1 1 1 1 1 1 1 1 1 . . . 
                        . 1 1 1 1 1 1 1 1 1 1 c c . . . 
                        . 1 1 1 1 1 1 1 1 1 c b c . . . 
                        . 1 1 1 1 1 . . . c b c . . . . 
                        . 1 1 . . . . . c b c . . . . . 
                        . . . . . . . c b c . . . . . . 
                        . . . . . c c b c . . . . . . . 
                        . . . . c b b c . . . . . . . . 
                        . . . c b c c . . . . . . . . . 
                        . . c e c c . . . . . . . . . . 
                        . c e c c . . . . . . . . . . . 
                        c e c . . . . . . . . . . . . . 
                        e c . . . . . . . . . . . . . . 
                        e . . . . . . . . . . . . . . . 
                        `,img`
                        e e c . . . . . . . . . . . . . 
                        . c e c . . . . . 1 1 1 1 . . . 
                        . . c e c . . . . 1 1 1 1 1 . . 
                        . . . c e c . . . . 1 1 1 1 1 . 
                        . . . c c b c . . . 1 1 1 1 1 . 
                        . . . . c c b c . . 1 1 1 1 1 . 
                        . . . . . c b c . . . 1 1 1 1 . 
                        . . . . . . c b c . . 1 1 1 1 . 
                        . . . . . . . c b c . 1 1 1 1 . 
                        . . . . . . . . c b c 1 1 1 1 . 
                        . . . . . . . . . c b c 1 1 1 . 
                        . . . . . . . . . . c b c 1 1 . 
                        . . . . . . . . . . . c c 1 . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        `,img`
                        . . . . . . . . . . . . . . . e 
                        . . . . . . . . . . . . . . c e 
                        . . . . . . . . . . . . . c e c 
                        . . . . . . . . . . . c c e c . 
                        . . . . . . . . . . c c e c . . 
                        . . . . . . . . . c c b c . . . 
                        . . . . . . . . c b b c . . . . 
                        . . . . . . . c b c c . . . . . 
                        . . . . . . c b c . . . . . . . 
                        . . . . . c b c . . . . . 1 1 . 
                        . . . . c b c . . . 1 1 1 1 1 . 
                        . . . c b c 1 1 1 1 1 1 1 1 1 . 
                        . . . c c 1 1 1 1 1 1 1 1 1 1 . 
                        . . . 1 1 1 1 1 1 1 1 1 1 1 . . 
                        . . . . 1 1 1 1 1 1 1 1 1 . . . 
                        . . . . . . . . . . . . . . . . 
                        `],
                    100,
                    characterAnimations.rule(Predicate.FacingRight)
                    )
                    enty.setPosition(value.x + randint(-10, 10), value.y + randint(-10, 10))
                    enty.setFlag(SpriteFlag.BounceOnWall, true)
                    enty.setVelocity(-59, -52)
                    enty.z = -4
                    enty.ay = 200
                    enty.lifespan = 4000
                    pause(100)
                }
                pause(5000)
                value.setImage(img`
                    ........................
                    ........................
                    ........................
                    .......cc.c.............
                    .......ccccccc..........
                    ........ccccccc.........
                    .........fccccc.........
                    .........ff1fcc.........
                    .........ff1f1f.........
                    .........f1111f.........
                    ..........fffff.........
                    .......bbbbcceee........
                    .......cbbbcffeee.......
                    .......ccbbbffeee.......
                    .......ccfffffeee.......
                    .......1cfffffeee.......
                    .......11fffff1ee.......
                    .........fffffcee.......
                    .........cc.cc.ce.......
                    .........cc.bb..........
                    .........bc.cc..........
                    .........cb.cc..........
                    .........cc.cc..........
                    .........bb.bb..........
                    `)
                pause(100)
                value.setImage(img`
                    ........................
                    ........................
                    ........................
                    .......cc.c.............
                    .......ccccccc..........
                    ........ccccccc.........
                    .........fccccc.........
                    .........f212cc.........
                    .........f2121f.........
                    .........f1111f.........
                    ..........fffff.........
                    .......bbbbcceee........
                    .......cbbbcffeee.......
                    .......ccbbbffeee.......
                    .......ccfffffeee.......
                    .......1cfffffeee.......
                    .......11fffff1ee.......
                    .........fffffcee.......
                    .........cc.cc.ce.......
                    .........cc.bb..........
                    .........bc.cc..........
                    .........cb.cc..........
                    .........cc.cc..........
                    .........bb.bb..........
                    `)
                for (let index = 0; index < randint(5, 15); index++) {
                    enty = sprites.create(img`
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . c c . . . . 
                        . . . . . . . . . c b c . . . . 
                        . . . . . . . . c b c . . . . . 
                        . . . . . . . c b c . . . . . . 
                        . . . . . . c b c . . . . . . . 
                        . . . . . c b c . . . . . . . . 
                        . . . . c b c . . . . . . . . . 
                        . . . c c b c . . . . . . . . . 
                        . . c c b c . . . . . . . . . . 
                        . . c e c . . . . . . . . . . . 
                        . c e c . . . . . . . . . . . . 
                        c e c . . . . . . . . . . . . . 
                        e c . . . . . . . . . . . . . . 
                        `, SpriteKind.EP_NOTTHEMUCISTIME)
                    characterAnimations.loopFrames(
                    enty,
                    [img`
                        . . . . . . . . . . . . . . . . 
                        . . . 2 2 2 2 2 2 2 2 2 2 2 . . 
                        . . 2 5 4 4 4 4 4 2 2 2 2 2 . . 
                        . 2 5 5 5 4 4 4 4 2 2 2 2 2 . . 
                        2 5 5 5 5 5 4 4 2 2 2 2 2 2 2 . 
                        2 5 5 5 5 4 4 4 4 2 2 2 2 2 2 2 
                        2 5 5 5 5 4 4 4 4 2 2 2 2 2 2 . 
                        2 5 5 5 5 5 4 4 2 2 2 2 . . . . 
                        2 5 5 5 5 4 4 2 2 2 2 2 2 . . . 
                        2 5 5 5 5 4 4 4 2 2 2 2 2 2 . . 
                        2 5 5 5 5 5 4 4 2 2 2 2 2 2 2 . 
                        . 2 5 5 5 4 4 4 2 2 2 2 2 2 . . 
                        . . 2 5 5 4 4 2 2 2 2 2 2 2 . . 
                        . . . 2 2 2 2 2 2 2 . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        `],
                    100,
                    characterAnimations.rule(Predicate.FacingLeft)
                    )
                    characterAnimations.loopFrames(
                    enty,
                    [img`
                        . . . . . . . . . . . . . . . . 
                        . . 2 2 2 2 2 2 2 2 2 2 2 . . . 
                        . . 2 2 2 2 2 4 4 4 4 4 5 2 . . 
                        . . 2 2 2 2 2 4 4 4 4 5 5 5 2 . 
                        . 2 2 2 2 2 2 2 4 4 5 5 5 5 5 2 
                        2 2 2 2 2 2 2 4 4 4 4 5 5 5 5 2 
                        . 2 2 2 2 2 2 4 4 4 4 5 5 5 5 2 
                        . . . . 2 2 2 2 4 4 5 5 5 5 5 2 
                        . . . 2 2 2 2 2 2 4 4 5 5 5 5 2 
                        . . 2 2 2 2 2 2 4 4 4 5 5 5 5 2 
                        . 2 2 2 2 2 2 2 4 4 5 5 5 5 5 2 
                        . . 2 2 2 2 2 2 4 4 4 5 5 5 2 . 
                        . . 2 2 2 2 2 2 2 4 4 5 5 2 . . 
                        . . . . . . 2 2 2 2 2 2 2 . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        `],
                    100,
                    characterAnimations.rule(Predicate.FacingRight)
                    )
                    characterAnimations.loopFrames(
                    enty,
                    [img`
                        . . . . . 2 . . . . . . . . . . 
                        . . . . 2 2 2 . . . 2 . . . . . 
                        . 2 2 2 2 2 2 . . 2 2 2 2 . . . 
                        . 2 2 2 2 2 2 . 2 2 2 2 2 . . . 
                        . 2 2 2 2 2 2 2 2 2 2 2 2 . . . 
                        . 2 2 2 2 2 2 2 2 2 2 2 2 . . . 
                        . 2 2 2 2 2 2 2 2 2 2 2 2 2 . . 
                        . 2 4 4 2 4 4 2 2 2 2 2 2 2 . . 
                        . 2 4 4 4 4 4 4 2 4 4 4 2 2 . . 
                        . 2 4 4 4 4 4 4 4 4 4 4 4 2 . . 
                        . 2 4 4 5 4 4 5 4 4 5 4 4 2 . . 
                        . 2 4 5 5 5 5 5 5 5 5 5 5 2 . . 
                        . 2 5 5 5 5 5 5 5 5 5 5 5 2 . . 
                        . . 2 5 5 5 5 5 5 5 5 5 2 . . . 
                        . . . 2 5 5 5 5 5 5 5 2 . . . . 
                        . . . . 2 2 2 2 2 2 2 . . . . . 
                        `],
                    100,
                    characterAnimations.rule(Predicate.FacingDown)
                    )
                    characterAnimations.loopFrames(
                    enty,
                    [img`
                        . . . . 2 2 2 2 2 2 2 . . . . . 
                        . . . 2 5 5 5 5 5 5 5 2 . . . . 
                        . . 2 5 5 5 5 5 5 5 5 5 2 . . . 
                        . 2 5 5 5 5 5 5 5 5 5 5 5 2 . . 
                        . 2 4 5 5 5 5 5 5 5 5 5 5 2 . . 
                        . 2 4 4 5 4 4 5 4 4 5 4 4 2 . . 
                        . 2 4 4 4 4 4 4 4 4 4 4 4 2 . . 
                        . 2 4 4 4 4 4 4 2 4 4 4 2 2 . . 
                        . 2 4 4 2 4 4 2 2 2 2 2 2 2 . . 
                        . 2 2 2 2 2 2 2 2 2 2 2 2 2 . . 
                        . 2 2 2 2 2 2 2 2 2 2 2 2 . . . 
                        . 2 2 2 2 2 2 2 2 2 2 2 2 . . . 
                        . 2 2 2 2 2 2 . 2 2 2 2 2 . . . 
                        . 2 2 2 2 2 2 . . 2 2 2 2 . . . 
                        . . . . 2 2 2 . . . 2 . . . . . 
                        . . . . . 2 . . . . . . . . . . 
                        `],
                    100,
                    characterAnimations.rule(Predicate.MovingUp)
                    )
                    enty.setPosition(value.x + randint(-10, 10), value.y + randint(-10, 10))
                    enty.setFlag(SpriteFlag.BounceOnWall, true)
                    enty.setVelocity(-59, -52)
                    enty.z = -4
                    enty.ay = 200
                    enty.lifespan = 4000
                    pause(100)
                }
                value.setImage(img`
                    ........................
                    ........................
                    ........................
                    .......cc.c.............
                    .......ccccccc..........
                    ........ccccccc.........
                    .........fccccc.........
                    .........f414cc.........
                    .........f4141f.........
                    .........f1111f.........
                    ..........fffff.........
                    .......bbbbcceee........
                    .......cbbbcffeee.......
                    .......ccbbbffeee.......
                    .......ccfffffeee.......
                    .......1cfffffeee.......
                    .......11fffff1ee.......
                    .........fffffcee.......
                    .........cc.cc.ce.......
                    .........cc.bb..........
                    .........bc.cc..........
                    .........cb.cc..........
                    .........cc.cc..........
                    .........bb.bb..........
                    `)
                pause(5000)
                for (let index = 0; index < randint(8, 18); index++) {
                    enty = sprites.create(img`
                        . . . . . . . . . . . . . . . . 
                        . . c c c c c c c c c c c . . . 
                        . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
                        . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
                        . c 1 c c 1 c c 1 1 1 1 1 c . . 
                        . c 1 c c 1 c c 1 1 1 1 1 c . . 
                        . c 1 c c 1 c c 1 1 1 1 1 c . . 
                        . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
                        . c 1 1 1 c c 1 1 1 1 1 1 c . . 
                        . c 1 1 c c c 1 1 1 1 1 1 c . . 
                        . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
                        . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
                        . c c c c c c c c c 1 1 c c . . 
                        . . c 1 c 1 c . . c 1 1 c . . . 
                        . . c c c c c . . c c 1 c . . . 
                        . . . . . . . . . . c c c . . . 
                        `, SpriteKind.Enemy)
                    characterAnimations.loopFrames(
                    enty,
                    [img`
                        . . . . . . . . . . . . . . . . 
                        . . c c c c c c c c c c c . . . 
                        . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
                        . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
                        . c 1 c c 1 c c 1 1 1 1 1 c . . 
                        . c 1 c c 1 c c 1 1 1 1 1 c . . 
                        . c 1 c c 1 c c 1 1 1 1 1 c . . 
                        . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
                        . c 1 1 1 c c 1 1 1 1 1 1 c . . 
                        . c 1 1 c c c 1 1 1 1 1 1 c . . 
                        . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
                        . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
                        . c c c c c c c c c 1 1 c c . . 
                        . . c 1 c 1 c . . c 1 1 c . . . 
                        . . c c c c c . . c c 1 c . . . 
                        . . . . . . . . . . c c c . . . 
                        `,img`
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . c c c c c c c c c c c . . . 
                        . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
                        . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
                        . c 1 c c 1 c c 1 1 1 1 1 c . . 
                        . c 1 c c 1 c c 1 1 1 1 1 c . . 
                        . c 1 c c 1 c c 1 1 1 1 1 c . . 
                        . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
                        . c 1 1 1 c c 1 1 1 1 1 1 c . . 
                        . c 1 1 c c c 1 1 1 1 1 1 c . . 
                        . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
                        . c c c c c c c c c 1 1 c c . . 
                        . . c 1 c 1 c . . c 1 1 c . . . 
                        . . c c c c c . . c c 1 c . . . 
                        . . . . . . . . . . c c c . . . 
                        `],
                    500,
                    characterAnimations.rule(Predicate.FacingLeft)
                    )
                    characterAnimations.loopFrames(
                    enty,
                    [img`
                        . . . . . . . . . . . . . . . . 
                        . . c c c c c c c c c c c . . . 
                        . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
                        . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
                        . c 1 1 1 1 1 c c 1 c c 1 c . . 
                        . c 1 1 1 1 1 c c 1 c c 1 c . . 
                        . c 1 1 1 1 1 c c 1 c c 1 c . . 
                        . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
                        . c 1 1 1 1 1 1 c c 1 1 1 c . . 
                        . c 1 1 1 1 1 1 c c c 1 1 c . . 
                        . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
                        . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
                        . c c 1 1 c c c c c c c c c . . 
                        . . c 1 1 c . . c 1 c 1 c . . . 
                        . . c 1 c c . . c c c c c . . . 
                        . . c c c . . . . . . . . . . . 
                        `,img`
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . c c c c c c c c c c c . . . 
                        . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
                        . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
                        . c 1 1 1 1 1 c c 1 c c 1 c . . 
                        . c 1 1 1 1 1 c c 1 c c 1 c . . 
                        . c 1 1 1 1 1 c c 1 c c 1 c . . 
                        . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
                        . c 1 1 1 1 1 1 c c 1 1 1 c . . 
                        . c 1 1 1 1 1 1 c c c 1 1 c . . 
                        . c 1 1 1 1 1 1 1 1 1 1 1 c . . 
                        . c c 1 1 c c c c c c c c c . . 
                        . . c 1 1 c . . c 1 c 1 c . . . 
                        . . c 1 c c . . c c c c c . . . 
                        . . c c c . . . . . . . . . . . 
                        `],
                    500,
                    characterAnimations.rule(Predicate.FacingRight)
                    )
                    enty.follow(Player_1, 50)
                    sprites.setDataBoolean(enty, "move", false)
                    sprites.setDataNumber(enty, "hp", 1)
                    sprites.setDataSprite(enty, "hpim", sprites.create(img`
                        . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . 
                        f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f 
                        f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f 
                        . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . 
                        . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . 
                        `, SpriteKind.hp))
                    sprites.readDataSprite(enty, "hpim").setFlag(SpriteFlag.Ghost, true)
                    sprites.setDataNumber(enty, "type", 3)
                    enty.setPosition(value.x + randint(-10, 10), value.y + randint(-10, 10))
                    pause(200)
                }
                pause(5000)
            }
        } else if (sprites.readDataNumber(value, "type") == 30) {
            if (Player_1.x < value.x) {
                characterAnimations.setCharacterState(value, characterAnimations.rule(Predicate.FacingLeft))
            }
            if (Player_1.x > value.x) {
                characterAnimations.setCharacterState(value, characterAnimations.rule(Predicate.FacingRight))
            }
            if (spriteutils.distanceBetween(Player_1, value) <= scene.screenWidth()) {
                timer.throttle("attack", 9000, function () {
                    for (let index = 0; index < randint(5, 15); index++) {
                        enty = sprites.create(img`
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . c c . . . . 
                            . . . . . . . . . c b c . . . . 
                            . . . . . . . . c b c . . . . . 
                            . . . . . . . c b c . . . . . . 
                            . . . . . . c b c . . . . . . . 
                            . . . . . c b c . . . . . . . . 
                            . . . . c b c . . . . . . . . . 
                            . . . c c b c . . . . . . . . . 
                            . . c c b c . . . . . . . . . . 
                            . . c e c . . . . . . . . . . . 
                            . c e c . . . . . . . . . . . . 
                            c e c . . . . . . . . . . . . . 
                            e c . . . . . . . . . . . . . . 
                            `, SpriteKind.EP_NOTTHEMUCISTIME)
                        characterAnimations.loopFrames(
                        enty,
                        [img`
                            . . . . . . . . . . . . . . . . 
                            . . . 2 2 2 2 2 2 2 2 2 2 2 . . 
                            . . 2 5 4 4 4 4 4 2 2 2 2 2 . . 
                            . 2 5 5 5 4 4 4 4 2 2 2 2 2 . . 
                            2 5 5 5 5 5 4 4 2 2 2 2 2 2 2 . 
                            2 5 5 5 5 4 4 4 4 2 2 2 2 2 2 2 
                            2 5 5 5 5 4 4 4 4 2 2 2 2 2 2 . 
                            2 5 5 5 5 5 4 4 2 2 2 2 . . . . 
                            2 5 5 5 5 4 4 2 2 2 2 2 2 . . . 
                            2 5 5 5 5 4 4 4 2 2 2 2 2 2 . . 
                            2 5 5 5 5 5 4 4 2 2 2 2 2 2 2 . 
                            . 2 5 5 5 4 4 4 2 2 2 2 2 2 . . 
                            . . 2 5 5 4 4 2 2 2 2 2 2 2 . . 
                            . . . 2 2 2 2 2 2 2 . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            `],
                        100,
                        characterAnimations.rule(Predicate.FacingLeft)
                        )
                        characterAnimations.loopFrames(
                        enty,
                        [img`
                            . . . . . . . . . . . . . . . . 
                            . . 2 2 2 2 2 2 2 2 2 2 2 . . . 
                            . . 2 2 2 2 2 4 4 4 4 4 5 2 . . 
                            . . 2 2 2 2 2 4 4 4 4 5 5 5 2 . 
                            . 2 2 2 2 2 2 2 4 4 5 5 5 5 5 2 
                            2 2 2 2 2 2 2 4 4 4 4 5 5 5 5 2 
                            . 2 2 2 2 2 2 4 4 4 4 5 5 5 5 2 
                            . . . . 2 2 2 2 4 4 5 5 5 5 5 2 
                            . . . 2 2 2 2 2 2 4 4 5 5 5 5 2 
                            . . 2 2 2 2 2 2 4 4 4 5 5 5 5 2 
                            . 2 2 2 2 2 2 2 4 4 5 5 5 5 5 2 
                            . . 2 2 2 2 2 2 4 4 4 5 5 5 2 . 
                            . . 2 2 2 2 2 2 2 4 4 5 5 2 . . 
                            . . . . . . 2 2 2 2 2 2 2 . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            `],
                        100,
                        characterAnimations.rule(Predicate.FacingRight)
                        )
                        characterAnimations.loopFrames(
                        enty,
                        [img`
                            . . . . . 2 . . . . . . . . . . 
                            . . . . 2 2 2 . . . 2 . . . . . 
                            . 2 2 2 2 2 2 . . 2 2 2 2 . . . 
                            . 2 2 2 2 2 2 . 2 2 2 2 2 . . . 
                            . 2 2 2 2 2 2 2 2 2 2 2 2 . . . 
                            . 2 2 2 2 2 2 2 2 2 2 2 2 . . . 
                            . 2 2 2 2 2 2 2 2 2 2 2 2 2 . . 
                            . 2 4 4 2 4 4 2 2 2 2 2 2 2 . . 
                            . 2 4 4 4 4 4 4 2 4 4 4 2 2 . . 
                            . 2 4 4 4 4 4 4 4 4 4 4 4 2 . . 
                            . 2 4 4 5 4 4 5 4 4 5 4 4 2 . . 
                            . 2 4 5 5 5 5 5 5 5 5 5 5 2 . . 
                            . 2 5 5 5 5 5 5 5 5 5 5 5 2 . . 
                            . . 2 5 5 5 5 5 5 5 5 5 2 . . . 
                            . . . 2 5 5 5 5 5 5 5 2 . . . . 
                            . . . . 2 2 2 2 2 2 2 . . . . . 
                            `],
                        100,
                        characterAnimations.rule(Predicate.FacingDown)
                        )
                        characterAnimations.loopFrames(
                        enty,
                        [img`
                            . . . . 2 2 2 2 2 2 2 . . . . . 
                            . . . 2 5 5 5 5 5 5 5 2 . . . . 
                            . . 2 5 5 5 5 5 5 5 5 5 2 . . . 
                            . 2 5 5 5 5 5 5 5 5 5 5 5 2 . . 
                            . 2 4 5 5 5 5 5 5 5 5 5 5 2 . . 
                            . 2 4 4 5 4 4 5 4 4 5 4 4 2 . . 
                            . 2 4 4 4 4 4 4 4 4 4 4 4 2 . . 
                            . 2 4 4 4 4 4 4 2 4 4 4 2 2 . . 
                            . 2 4 4 2 4 4 2 2 2 2 2 2 2 . . 
                            . 2 2 2 2 2 2 2 2 2 2 2 2 2 . . 
                            . 2 2 2 2 2 2 2 2 2 2 2 2 . . . 
                            . 2 2 2 2 2 2 2 2 2 2 2 2 . . . 
                            . 2 2 2 2 2 2 . 2 2 2 2 2 . . . 
                            . 2 2 2 2 2 2 . . 2 2 2 2 . . . 
                            . . . . 2 2 2 . . . 2 . . . . . 
                            . . . . . 2 . . . . . . . . . . 
                            `],
                        100,
                        characterAnimations.rule(Predicate.MovingUp)
                        )
                        enty.setPosition(value.x + randint(-10, 10), value.y + randint(-10, 10))
                        enty.setFlag(SpriteFlag.BounceOnWall, true)
                        enty.setVelocity(-59, -52)
                        enty.z = -4
                        enty.ay = 200
                        enty.lifespan = 4000
                        pause(100)
                    }
                    pause(2000)
                    for (let index = 0; index < randint(1, 4); index++) {
                        enty = sprites.create(img`
                            . . . . . . . . . . . . . . . . 
                            . c c c c c c c c c c c c c . . 
                            . c b b b b b b b b b b b c . . 
                            . c b 1 1 b b 2 2 b 2 2 b c . . 
                            . c b 1 b b b 2 2 b 2 2 b c . . 
                            . c b b b b b 2 2 b 2 2 b c . . 
                            . c b b b b b 2 2 b 2 2 b c . . 
                            . c b b b b b b b b b b b c . . 
                            . c b b b b b b 2 2 2 b b c . . 
                            . c b b b b b b b 2 2 b b c . . 
                            . c b b b b b b b b b b b c . . 
                            . c b b b b b b b b b b b c . . 
                            . c c b b c b b c b b b b c . . 
                            . c c b b c c c c b b c c c . . 
                            . . c b b c . . c b b c . . . . 
                            . . c c c c . . c c c c . . . . 
                            `, SpriteKind.Enemy)
                        characterAnimations.loopFrames(
                        enty,
                        [img`
                            . . . . . . . . . . . . . . . . 
                            . c c c c c c c c c c c c c . . 
                            . c b b b b b b b b b b b c . . 
                            . c b 2 2 b 2 2 b b 1 1 b c . . 
                            . c b 2 2 b 2 2 b b b 1 b c . . 
                            . c b 2 2 b 2 2 b b b b b c . . 
                            . c b 2 2 b 2 2 b b b b b c . . 
                            . c b b b b b b b b b b b c . . 
                            . c b b 2 2 2 b b b b b b c . . 
                            . c b b 2 2 b b b b b b b c . . 
                            . c b b b b b b b b b b b c . . 
                            . c b b b b b b c b b b b c . . 
                            . c b c b b b b c b b c b c . . 
                            . c c c b b c c c b b c c c . . 
                            . . . c b b c . c c c c . . . . 
                            . . . c c c c . . . . . . . . . 
                            `,img`
                            . . . . . . . . . . . . . . . . 
                            . c c c c c c c c c c c c c . . 
                            . c b b b b b b b b b b b c . . 
                            . c b 2 2 b 2 2 b b 1 1 b c . . 
                            . c b 2 2 b 2 2 b b b 1 b c . . 
                            . c b 2 2 b 2 2 b b b b b c . . 
                            . c b 2 2 b 2 2 b b b b b c . . 
                            . c b b b b b b b b b b b c . . 
                            . c b b 2 2 2 b b b b b b c . . 
                            . c b b 2 2 b b b b b b b c . . 
                            . c b b b b b b b b b b b c . . 
                            . c b b b b c b b b b b b c . . 
                            . c b c b b c b b b b c b c . . 
                            . c c c b b c c c b b c c c . . 
                            . . . c c c c . c b b c . . . . 
                            . . . . . . . . c c c c . . . . 
                            `,img`
                            . . . . . . . . . . . . . . . . 
                            . c c c c c c c c c c c c c . . 
                            . c b b b b b b b b b b b c . . 
                            . c b 2 2 b 2 2 b b 1 1 b c . . 
                            . c b 2 2 b 2 2 b b b 1 b c . . 
                            . c b 2 2 b 2 2 b b b b b c . . 
                            . c b 2 2 b 2 2 b b b b b c . . 
                            . c b b b b b b b b b b b c . . 
                            . c b b 2 2 2 b b b b b b c . . 
                            . c b b 2 2 b b b b b b b c . . 
                            . c b b b b b b b b b b b c . . 
                            . c b b b b c b b b b b b c . . 
                            . c b b b c c b b c b b b c . . 
                            . c c c c c c b b c c c c c . . 
                            . . . . . c c c c c . . . . . . 
                            . . . . . c c c c . . . . . . . 
                            `,img`
                            . . . . . . . . . . . . . . . . 
                            . c c c c c c c c c c c c c . . 
                            . c b b b b b b b b b b b c . . 
                            . c b 2 2 b 2 2 b b 1 1 b c . . 
                            . c b 2 2 b 2 2 b b b 1 b c . . 
                            . c b 2 2 b 2 2 b b b b b c . . 
                            . c b 2 2 b 2 2 b b b b b c . . 
                            . c b b b b b b b b b b b c . . 
                            . c b b 2 2 2 b b b b b b c . . 
                            . c b b 2 2 b b b b b b b c . . 
                            . c b b b b b b b b b b b c . . 
                            . c b b b b b b c b b b b c . . 
                            . c b b b c b b c c b b b c . . 
                            . c c c c c b b c c c c c c . . 
                            . . . . . c c c c c . . . . . . 
                            . . . . . . c c c c . . . . . . 
                            `,img`
                            . . . . . . . . . . . . . . . . 
                            . c c c c c c c c c c c c c . . 
                            . c b b b b b b b b b b b c . . 
                            . c b 2 2 b 2 2 b b 1 1 b c . . 
                            . c b 2 2 b 2 2 b b b 1 b c . . 
                            . c b 2 2 b 2 2 b b b b b c . . 
                            . c b 2 2 b 2 2 b b b b b c . . 
                            . c b b b b b b b b b b b c . . 
                            . c b b 2 2 2 b b b b b b c . . 
                            . c b b 2 2 b b b b b b b c . . 
                            . c b b b b b b b b b b b c . . 
                            . c b b b b c b b b b b b c . . 
                            . c b c b b c b b b c b b c . . 
                            . c c c b b c c b b c c c c . . 
                            . . . c c c c c b b c . . . . . 
                            . . . . . . . c c c c . . . . . 
                            `,img`
                            . . . . . . . . . . . . . . . . 
                            . c c c c c c c c c c c c c . . 
                            . c b b b b b b b b b b b c . . 
                            . c b 2 2 b 2 2 b b 1 1 b c . . 
                            . c b 2 2 b 2 2 b b b 1 b c . . 
                            . c b 2 2 b 2 2 b b b b b c . . 
                            . c b 2 2 b 2 2 b b b b b c . . 
                            . c b b b b b b b b b b b c . . 
                            . c b b 2 2 2 b b b b b b c . . 
                            . c b b 2 2 b b b b b b b c . . 
                            . c b b b b b b b b b b b c . . 
                            . c b b b b b b b b b b b c . . 
                            . c b b b c b b b b b c b c . . 
                            . c c b b c c c c b b c c c . . 
                            . . c b b c . . c b b c . . . . 
                            . . c c c c . . c c c c . . . . 
                            `],
                        100,
                        characterAnimations.rule(Predicate.FacingLeft)
                        )
                        characterAnimations.loopFrames(
                        enty,
                        [img`
                            . . . . . . . . . . . . . . . . 
                            . . c c c c c c c c c c c c c . 
                            . . c b b b b b b b b b b b c . 
                            . . c b 2 2 b 2 2 b b 1 1 b c . 
                            . . c b 2 2 b 2 2 b b b 1 b c . 
                            . . c b 2 2 b 2 2 b b b b b c . 
                            . . c b 2 2 b 2 2 b b b b b c . 
                            . . c b b b b b b b b b b b c . 
                            . . c b b 2 2 2 b b b b b b c . 
                            . . c b b 2 2 b b b b b b b c . 
                            . . c b b b b b b b b b b b c . 
                            . . c b b b b b b c b b b b c . 
                            . . c b c b b b b c b b c b c . 
                            . . c c c b b c c c b b c c c . 
                            . . . . c b b c . c c c c . . . 
                            . . . . c c c c . . . . . . . . 
                            `,img`
                            . . . . . . . . . . . . . . . . 
                            . . c c c c c c c c c c c c c . 
                            . . c b b b b b b b b b b b c . 
                            . . c b 2 2 b 2 2 b b 1 1 b c . 
                            . . c b 2 2 b 2 2 b b b 1 b c . 
                            . . c b 2 2 b 2 2 b b b b b c . 
                            . . c b 2 2 b 2 2 b b b b b c . 
                            . . c b b b b b b b b b b b c . 
                            . . c b b 2 2 2 b b b b b b c . 
                            . . c b b 2 2 b b b b b b b c . 
                            . . c b b b b b b b b b b b c . 
                            . . c b b b b c b b b b b b c . 
                            . . c b c b b c b b b b c b c . 
                            . . c c c b b c c c b b c c c . 
                            . . . . c c c c . c b b c . . . 
                            . . . . . . . . . c c c c . . . 
                            `,img`
                            . . . . . . . . . . . . . . . . 
                            . . c c c c c c c c c c c c c . 
                            . . c b b b b b b b b b b b c . 
                            . . c b 2 2 b 2 2 b b 1 1 b c . 
                            . . c b 2 2 b 2 2 b b b 1 b c . 
                            . . c b 2 2 b 2 2 b b b b b c . 
                            . . c b 2 2 b 2 2 b b b b b c . 
                            . . c b b b b b b b b b b b c . 
                            . . c b b 2 2 2 b b b b b b c . 
                            . . c b b 2 2 b b b b b b b c . 
                            . . c b b b b b b b b b b b c . 
                            . . c b b b b c b b b b b b c . 
                            . . c b b b c c b b c b b b c . 
                            . . c c c c c c b b c c c c c . 
                            . . . . . . c c c c c . . . . . 
                            . . . . . . c c c c . . . . . . 
                            `,img`
                            . . . . . . . . . . . . . . . . 
                            . . c c c c c c c c c c c c c . 
                            . . c b b b b b b b b b b b c . 
                            . . c b 2 2 b 2 2 b b 1 1 b c . 
                            . . c b 2 2 b 2 2 b b b 1 b c . 
                            . . c b 2 2 b 2 2 b b b b b c . 
                            . . c b 2 2 b 2 2 b b b b b c . 
                            . . c b b b b b b b b b b b c . 
                            . . c b b 2 2 2 b b b b b b c . 
                            . . c b b 2 2 b b b b b b b c . 
                            . . c b b b b b b b b b b b c . 
                            . . c b b b b b b c b b b b c . 
                            . . c b b b c b b c c b b b c . 
                            . . c c c c c b b c c c c c c . 
                            . . . . . . c c c c c . . . . . 
                            . . . . . . . c c c c . . . . . 
                            `,img`
                            . . . . . . . . . . . . . . . . 
                            . . c c c c c c c c c c c c c . 
                            . . c b b b b b b b b b b b c . 
                            . . c b 2 2 b 2 2 b b 1 1 b c . 
                            . . c b 2 2 b 2 2 b b b 1 b c . 
                            . . c b 2 2 b 2 2 b b b b b c . 
                            . . c b 2 2 b 2 2 b b b b b c . 
                            . . c b b b b b b b b b b b c . 
                            . . c b b 2 2 2 b b b b b b c . 
                            . . c b b 2 2 b b b b b b b c . 
                            . . c b b b b b b b b b b b c . 
                            . . c b b b b c b b b b b b c . 
                            . . c b c b b c b b b c b b c . 
                            . . c c c b b c c b b c c c c . 
                            . . . . c c c c c b b c . . . . 
                            . . . . . . . . c c c c . . . . 
                            `,img`
                            . . . . . . . . . . . . . . . . 
                            . . c c c c c c c c c c c c c . 
                            . . c b b b b b b b b b b b c . 
                            . . c b 2 2 b 2 2 b b 1 1 b c . 
                            . . c b 2 2 b 2 2 b b b 1 b c . 
                            . . c b 2 2 b 2 2 b b b b b c . 
                            . . c b 2 2 b 2 2 b b b b b c . 
                            . . c b b b b b b b b b b b c . 
                            . . c b b 2 2 2 b b b b b b c . 
                            . . c b b 2 2 b b b b b b b c . 
                            . . c b b b b b b b b b b b c . 
                            . . c b b b b b b b b b b b c . 
                            . . c b b b c b b b b b c b c . 
                            . . c c b b c c c c b b c c c . 
                            . . . c b b c . . c b b c . . . 
                            . . . c c c c . . c c c c . . . 
                            `],
                        100,
                        characterAnimations.rule(Predicate.FacingRight)
                        )
                        if (Math.percentChance(50)) {
                            enty.vx = 50
                        } else {
                            enty.vx = -50
                        }
                        enty.ay = 200
                        sprites.setDataBoolean(enty, "move", false)
                        sprites.setDataNumber(enty, "hp", 5)
                        sprites.setDataSprite(enty, "hpim", sprites.create(img`
                            . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . 
                            f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f 
                            f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f 
                            . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . 
                            . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . 
                            `, SpriteKind.hp))
                        sprites.readDataSprite(enty, "hpim").setFlag(SpriteFlag.Ghost, true)
                        sprites.setDataNumber(enty, "type", 2)
                        enty.setPosition(value.x + randint(-10, 10), value.y + randint(-10, 10))
                        pause(200)
                    }
                    pause(2000)
                    for (let index = 0; index < randint(3, 8); index++) {
                        enty = sprites.create(img`
                            . . . . . . . . . . . . . . . . 
                            . . c c c c c c c c c c c . . . 
                            . c b b b b b b b b b b b c . . 
                            . c b c b b b b b b b c b c . . 
                            . c b 2 2 b 2 2 b b b b b c . . 
                            . c b 2 2 b 2 2 b b b b b c . . 
                            . c b 2 2 b 2 2 b b b b b c . . 
                            . c b b b b b b b b b b b c . . 
                            . c b b b 2 2 b b b b b b c . . 
                            . c b b 2 2 2 b b b b b b c . . 
                            . c b c b b b b b b b c b c . . 
                            . c b b b b b b b b b b b c . . 
                            . . c c c c c c c c b b c . . . 
                            . . c b c b c . . c b b c . . . 
                            . . c c c c c . . c c b c . . . 
                            . . . . . . . . . . c c c . . . 
                            `, SpriteKind.Enemy)
                        characterAnimations.loopFrames(
                        enty,
                        [img`
                            . . . . . . . . . . . . . . . . 
                            . . c c c c c c c c c c c . . . 
                            . c b b b b b b b b b b b c . . 
                            . c b c b b b b b b b c b c . . 
                            . c b 2 2 b 2 2 b b b b b c . . 
                            . c b 2 2 b 2 2 b b b b b c . . 
                            . c b 2 2 b 2 2 b b b b b c . . 
                            . c b b b b b b b b b b b c . . 
                            . c b b b 2 2 b b b b b b c . . 
                            . c b b 2 2 2 b b b b b b c . . 
                            . c b c b b b b b b b c b c . . 
                            . c b b b b b b b b b b b c . . 
                            . . c c c c c c c c b b c . . . 
                            . . c b c b c . . c b b c . . . 
                            . . c c c c c . . c c b c . . . 
                            . . . . . . . . . . c c c . . . 
                            `,img`
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . c c c c c c c c c c c . . . 
                            . c b b b b b b b b b b b c . . 
                            . c b c b b b b b b b c b c . . 
                            . c b 2 2 b 2 2 b b b b b c . . 
                            . c b 2 2 b 2 2 b b b b b c . . 
                            . c b 2 2 b 2 2 b b b b b c . . 
                            . c b b b b b b b b b b b c . . 
                            . c b b b 2 2 b b b b b b c . . 
                            . c b b 2 2 2 b b b b b b c . . 
                            . c b c b b b b b b b c b c . . 
                            . . c c c c c c c c b b c . . . 
                            . . c b c b c . . c b b c . . . 
                            . . c c c c c . . c c b c . . . 
                            . . . . . . . . . . c c c . . . 
                            `],
                        500,
                        characterAnimations.rule(Predicate.FacingLeft)
                        )
                        characterAnimations.loopFrames(
                        enty,
                        [img`
                            . . . . . . . . . . . . . . . . 
                            . . c c c c c c c c c c c . . . 
                            . c b b b b b b b b b b b c . . 
                            . c b c b b b b b b b c b c . . 
                            . c b b b b b 2 2 b 2 2 b c . . 
                            . c b b b b b 2 2 b 2 2 b c . . 
                            . c b b b b b 2 2 b 2 2 b c . . 
                            . c b b b b b b b b b b b c . . 
                            . c b b b b b b 2 2 b b b c . . 
                            . c b b b b b b 2 2 2 b b c . . 
                            . c b c b b b b b b b c b c . . 
                            . c b b b b b b b b b b b c . . 
                            . . c b b c c c c c c c c . . . 
                            . . c b b c . . c b c b c . . . 
                            . . c b c c . . c c c c c . . . 
                            . . c c c . . . . . . . . . . . 
                            `,img`
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . c c c c c c c c c c c . . . 
                            . c b b b b b b b b b b b c . . 
                            . c b c b b b b b b b c b c . . 
                            . c b b b b b 2 2 b 2 2 b c . . 
                            . c b b b b b 2 2 b 2 2 b c . . 
                            . c b b b b b 2 2 b 2 2 b c . . 
                            . c b b b b b b b b b b b c . . 
                            . c b b b b b b 2 2 b b b c . . 
                            . c b b b b b b 2 2 2 b b c . . 
                            . c b c b b b b b b b c b c . . 
                            . . c b b c c c c c c c c . . . 
                            . . c b b c . . c b c b c . . . 
                            . . c b c c . . c c c c c . . . 
                            . . c c c . . . . . . . . . . . 
                            `],
                        500,
                        characterAnimations.rule(Predicate.FacingRight)
                        )
                        enty.follow(Player_1, 50)
                        sprites.setDataBoolean(enty, "move", false)
                        sprites.setDataNumber(enty, "hp", 5)
                        sprites.setDataSprite(enty, "hpim", sprites.create(img`
                            . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . . . f . f . 
                            f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f . f 2 f 2 f 
                            f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f . f 2 2 2 f 
                            . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . . . f 2 f . 
                            . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . . . . f . . 
                            `, SpriteKind.hp))
                        sprites.readDataSprite(enty, "hpim").setFlag(SpriteFlag.Ghost, true)
                        sprites.setDataNumber(enty, "type", 3)
                        enty.setPosition(value.x + randint(-10, 10), value.y + randint(-10, 10))
                        pause(200)
                    }
                })
            }
        }
    }
})
forever(function () {
    if (intro) {
        scene.setBackgroundImage(img`
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999111111999999999999999999999999991111119999999999999999999999999999999999911111111119999999999999999999999999999999999999
            9999999999999999999999999999999999999991111111999999999999999999999999991111119999999111111119999999999999999999911111111119999999999999999999999999999999999999
            9999999999999999999999999999999999999991111111199999999999999999999999911111111999991111111111999999999999999999111111111111999999999999999999991111111111999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999991111111111999999999999999999999999999999999999999999999999991111111111999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999911111111111199999
            9999999911111111111111999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999911111111111111999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999111111111111111199999999999999999999999999999999911111119999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999111111111111111199999999999999999999999999999999911111119999999991111199999999999999999999999999999999999999999999991119999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999111111111999999991111199999999999999999999999999999999999999999999911111999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999111111111999999911111119999999999999999999999999999999999999999999911111999999999999999999999999111111999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999991111111199
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999991111111199
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999991111111119999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999991111111119999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999911111111111999999999999999999999999999999999999991111111199999999999999999
            9999999999999911111111111111119999999999999999999999999999999999999999999999999999999999999999999991111111199999999999999999999999999991111111199999999999999999
            9999999999999111111111111111111999999999991111111999999999999999999999999999999999999999999999999991111111199999999999999999999999999911111111119999999999999999
            9999999999999111111111111111111999999999991111111999999999999999999999999999999999999999999999999111111111111999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999911111111199999922999999999999999999999999999999999999999111111111111999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999991199999999999911111199999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999911199999999999111111119999999999999999999999999999999999999999999999988999999999999999999999111111999999
            9999999999999999999999999999999999999999999999999999999911199999999999999999999999999999999999999999999999999999999999999999991199999999999999999991111111199999
            99999999999999999999999999999999999999999999999999999ee91e999999999999999999999999999999999999999999999999999999999999999999911199999999999999999991111111199999
            99999999999999999999999999999999999999999999999999999eeeeeeee9999999999999999999999999999999999999999999999999999999999999eee1e999999999999999999999999999999999
            99999999999999999999999999999999999999999999999999999eeeeeee99999999999999999999999999999999999999999999999999999999999999eeeeeeee999999999999999999999999999999
            88888888888888888888888888888888888888888888888888888eeeeee8888888888888888888888888888888888888888888888888888888888888888eeeeee8888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            888888888888888888888888888888888888888888888888888888888888888888888888888888888888888c888888888888888888888888888888888888888888888888888888888888888888888888
            88888888888888888888888888888888888888888888888888888888888888888888888888888888888888c8888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            `)
        scroller.scrollBackgroundWithCamera(scroller.CameraScrollMode.OnlyHorizontal)
        scroller.scrollBackgroundWithSpeed(3, 0)
    }
    for (let value of sprites.allOfKind(SpriteKind.NPC)) {
        timer.throttle("move", 100, function () {
            if (value.x == Player_1.x) {
                value.vx = 0
            } else if (value.x > Player_1.x) {
                value.vx = -111
            } else if (value.x < Player_1.x) {
                value.vx = 111
            }
        })
        timer.throttle("shoot", 1000, function () {
            doSomething(value)
        })
        if (value.y > Player_1.y) {
            value.vy = -100
            pause(200)
        }
    }
})
game.onUpdateInterval(2000, function () {
    for (let value of tiles.getTilesByType(assets.tile`myTile90`)) {
        WInd = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . 1 1 1 1 . 1 1 1 . 1 1 1 1 . . 
            . 1 . . 1 . 1 . 1 . 1 . . 1 . . 
            . 1 . . 1 . 1 . 1 . 1 . . 1 . . 
            . 1 . . 1 . 1 . . . . . . 1 . . 
            . . . . 1 . 1 . . . . . . 1 . . 
            . 1 1 . 1 . 1 . 1 1 1 1 . 1 . . 
            . 1 . . 1 . 1 . 1 . . 1 . 1 . . 
            . 1 . . 1 . 1 . 1 . . 1 . 1 . . 
            . 1 . . 1 . 1 . 1 . . . . 1 . . 
            . 1 . . 1 . 1 . 1 . . . . 1 . . 
            . 1 . . 1 . 1 . 1 . . . . 1 . . 
            . 1 . . 1 . 1 . 1 . . . . 1 . . 
            . 1 . . 1 . 1 . 1 . . . . 1 . . 
            . 1 . . 1 . 1 . 1 . . . . 1 . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Kwind)
        WInd.setFlag(SpriteFlag.DestroyOnWall, true)
        WInd.setVelocity(0, -100)
        tiles.placeOnTile(WInd, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile93`)) {
        WInd = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . 1 . . . . 1 . 1 . 1 . . 1 . 
            . . 1 . . . . 1 . 1 . 1 . . 1 . 
            . . 1 . . . . 1 . 1 . 1 . . 1 . 
            . . 1 . . . . 1 . 1 . 1 . . 1 . 
            . . 1 . . . . 1 . 1 . 1 . . 1 . 
            . . 1 . . . . 1 . 1 . 1 . . 1 . 
            . . 1 . 1 . . 1 . 1 . 1 . . 1 . 
            . . 1 . 1 . . 1 . 1 . 1 . . 1 . 
            . . 1 . 1 1 1 1 . 1 . 1 . 1 1 . 
            . . 1 . . . . . . 1 . 1 . . . . 
            . . 1 . . . . . . 1 . 1 . . 1 . 
            . . 1 . . 1 . 1 . 1 . 1 . . 1 . 
            . . 1 . . 1 . 1 . 1 . 1 . . 1 . 
            . . 1 1 1 1 . 1 1 1 . 1 1 1 1 . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Kwind)
        WInd.setFlag(SpriteFlag.DestroyOnWall, true)
        WInd.setVelocity(0, 100)
        tiles.placeOnTile(WInd, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile94`)) {
        WInd = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
            . 1 . . . . . . . . . . . . . . 
            . 1 . . . . 1 1 1 . . . . . . . 
            . 1 1 1 . . 1 . . . . . . . . . 
            . . . . . . 1 . . . . . . . . . 
            . 1 1 1 . . 1 1 1 1 1 1 1 1 1 . 
            . 1 . . . . . . . . . . . . . . 
            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
            . . . . . . . . . . . . . . . . 
            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
            . 1 . . . . . . . . . . . . . . 
            . 1 . . . . 1 . . . . . . . . . 
            . 1 1 1 1 . 1 1 1 1 1 1 1 1 1 . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Kwind)
        WInd.setFlag(SpriteFlag.DestroyOnWall, true)
        WInd.setVelocity(-1 * 255, 0)
        tiles.placeOnTile(WInd, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile91`)) {
        WInd = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
            . 1 . . . . . . . . . . . . . . 
            . 1 . . . . 1 1 1 . . . . . . . 
            . 1 1 1 . . 1 . . . . . . . . . 
            . . . . . . 1 . . . . . . . . . 
            . 1 1 1 . . 1 1 1 1 1 1 1 1 1 . 
            . 1 . . . . . . . . . . . . . . 
            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
            . . . . . . . . . . . . . . . . 
            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
            . 1 . . . . . . . . . . . . . . 
            . 1 . . . . 1 . . . . . . . . . 
            . 1 1 1 1 . 1 1 1 1 1 1 1 1 1 . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Kwind)
        WInd.setFlag(SpriteFlag.DestroyOnWall, true)
        WInd.setVelocity(-100, 0)
        tiles.placeOnTile(WInd, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile92`)) {
        WInd = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
            . . . . . . . . . . . . . . 1 . 
            . . . . . . . 1 1 1 . . . . 1 . 
            . . . . . . . . . 1 . . 1 1 1 . 
            . . . . . . . . . 1 . . . . . . 
            . 1 1 1 1 1 1 1 1 1 . . 1 1 1 . 
            . . . . . . . . . . . . . . 1 . 
            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
            . . . . . . . . . . . . . . . . 
            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
            . . . . . . . . . . . . . . 1 . 
            . . . . . . . . . 1 . . . . 1 . 
            . 1 1 1 1 1 1 1 1 1 . 1 1 1 1 . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Kwind)
        WInd.setFlag(SpriteFlag.DestroyOnWall, true)
        WInd.setVelocity(100, 0)
        tiles.placeOnTile(WInd, value)
    }
})
