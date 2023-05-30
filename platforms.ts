//% color="#000000"
//% icon="\uf0c8"
//% blockGap=8
//% block="Platform Sprites"
namespace PlatformSprites {

    let overlapCheck = true
    let whichPlatform: Sprite = null

    /**
     * Creates a platform sprite.
     */
    //% block="platform with image $image=screen_image_picker of kind $kind=spritekind"
    //% inlineInputMode=inline
    //% blockSetVariable=myPlatform
    //% weight=10
    export function makePlatform(image: Image, kind: number) {
        return sprites.create(image, kind);
    }

    /**
     * Makes the chosen sprite move like a moving platform.
     */
    //% block="start $platform=variables_get movement $movementSpeed"
    //% movementSpeed.defl=myPlatform
    //% platform.shadow=variables_get
    //% platform.defl=myPlatform
    //% weight=5
    export function startPlatformMovement(platform: Sprite, movementSpeed: number) {
        platform.setBounceOnWall(true)
        platform.setVelocity(movementSpeed, 0)
    }

    /**
     * This block should be placed in an overlap event. Put the sprite value into the first input, and put the otherSprite value into the second input.
     */
    //% block="make collision with sprite $sprite=variables_get and sprite $otherSprite=variables_get"
    //% sprite.shadow=variables_get
    //% sprite.defl=sprite
    //% otherSprite.shadow=variables_get
    //% otherSprite.defl=otherSprite
    //% weight=0
    export function platformCollision(sprite: Sprite, otherSprite: Sprite) {
        if (sprite.y < otherSprite.y - 3) {
            whichPlatform = otherSprite
            sprite.vx = otherSprite.vx
            if (overlapCheck) {
                overlapCheck = false
                spriteutils.onSpriteUpdateInterval(sprite, 0, function (sprite) {
                    if (sprite.overlapsWith(whichPlatform) && sprite.y < whichPlatform.y - 3) {
                        sprite.ay = 0
                        sprite.vy = 0
                        sprite.y += -0.75
                    } else {
                        sprite.ay = 500
                    }
                })
            }
        }
    }

}