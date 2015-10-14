//  Load various functions and objects
var platforms;
var score = 0;
var scoreText;
var health_count = 0;

// Pistol = 0, Dual = 1, automatic = 2
var current_weapon = 0;
var fired = false;
var semi = true;
var health = 0;
var ammo = '0';
var time;
var last_health_spawn = 0;
var last_weapon_spawn = 0;
var current_weapon_powerup;
var ammo_circle;
var healthbar;
var MAX_LIVES = 3;
var lives = 3;
var stashed;
var stashed_check = false;
var reloadText;
weapons = [];
var level_enemies;

var level0State = {

    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.cursors = game.input.keyboard.createCursorKeys();
        game.world.setBounds(0, 0, 1500, 1500);
        
        // Mapping New Controls
        wasd = {
            up: game.input.keyboard.addKey(Phaser.Keyboard.W),
            down: game.input.keyboard.addKey(Phaser.Keyboard.S),
            right: game.input.keyboard.addKey(Phaser.Keyboard.D),
            left: game.input.keyboard.addKey(Phaser.Keyboard.A)
        };

        // Background
        var bg = game.add.tileSprite(0, 0, 1500, 1500, 'grass');
        
        // Boundaries and Obstacles
        obstacles = game.add.group();
        obstacles.enableBody = true;
        
        edges = game.add.group();
        edges.enableBody = true;
        var size = 30;
        for (i = 0; i < size; i++) {
            if (i < size / 4) {
                var bounds = edges.create(-40, (100 * i) + -10, 'tree1');
                var bounds2 = edges.create(-40, 100 * i, 'tree2');
                bounds.enableBody = true;
                bounds2.enableBody = true;
                bounds.body.immovable = true;
                bounds2.body.immovable = true;
            }
            else if (i > (size / 4) - 1 && i < (size/2)) {
                var bounds = edges.create((100 * (i - (size/4))) + 30, -10, 'tree1');
                var bounds2 = edges.create(100 * (i - (size/4)), 60, 'tree2');
                bounds.enableBody = true;
                bounds2.enableBody = true;
                
                bounds.body.immovable = true;
                bounds2.body.immovable = true;
               
            }
            else if (i > (size / 2) - 1 && i < size - (size/4)) {
                var bounds = edges.create((100 * (i - (size / 2))) + 50, 100 * (size/4), 'tree1');
                var bounds2 = edges.create((100 * (i - (size / 2))), 100 * (size/4) + 50, 'tree2');
                var bounds3 = edges.create((100 * (i - (size/2))) + 30, 100 * (size/4) + 100, 'tree1');
                var bounds4 = edges.create(100 * (i - (size/2)), 100 * (size/4) + 150, 'tree2');
                bounds.enableBody = true;
                bounds2.enableBody = true;
                bounds3.enableBody = true;
                bounds4.enableBody = true;
                bounds.body.immovable = true;
                bounds2.body.immovable = true;
                bounds3.body.immovable = true;
                bounds4.body.immovable = true;                

            }
            else if (i > (size - (size/4) - 1) && i < size) {
                var bounds = edges.create(100 * (size/4), (i - (size - size/4)) * 100, 'tree1');
                var bounds2 = edges.create(100 * (size/4) + 50, ((i - (size - size/4)) * 100) + 50, 'tree2');
                var bounds3 = edges.create(100 * (size/4) + 100, (i - (size - size/4)) * 100, 'tree1');
                var bounds4 = edges.create(100 * (size/4) + 150, ((i - (size - size/4)) * 100) + 50, 'tree2');
                bounds.enableBody = true;
                bounds2.enableBody = true;
                bounds3.enableBody = true;
                bounds4.enableBody = true;
                bounds.body.immovable = true;
                bounds2.body.immovable = true;
                bounds3.body.immovable = true;
                bounds4.body.immovable = true;   
            }
        }

        // Level Exit
        exit = game.add.sprite(300, 710, 'level_exit');
        game.physics.enable(exit, Phaser.Physics.ARCADE);

        // Initalizing Player
        player = game.add.sprite(130, 250, 'player');
        player.anchor.setTo(.5, .5);
        player.scale.setTo(2, 2);
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.force = {x:0.0, y:0.0};
        player.animations.add('walk');
        player.body.collideWorldBounds = true;

        // Camera
        game.camera.follow(player);

        // Add Weapons 
        weapons.push(new Weapon.SingleBullet(this.game));

        // Header
        var header = game.add.sprite(0, 0, 'header');
        header.fixedToCamera = true;

        // Health
        health_powerups = game.add.group();
        var health_pu1 = Health(health_powerups, 50, 200, 600);
        var health_pu2 = Health(health_powerups, 50, 620, 600);

        var healthbar_bg = game.add.sprite(0, 2, 'healthbar_bg');
        healthbar_bg.fixedToCamera = true;
        healthbar = game.add.sprite(2.75, 6, 'healthbar');
        healthbar.fixedToCamera = true;
        healthbar.cropEnabled = true;
        healthText = game.add.text(77.5, 10, health, { fontSize: '50px', fill: 'white'});
        healthText.fixedToCamera = true;

        // Add Enemy Group
        gorillas = game.add.group();
        
        // Ammo
        reloadText = game.add.text(320, 400, '', { fontSize: '120px', fill: 'white', visible: false});
        reloadText.fixedToCamera = true;
        ammo_circle = game.add.sprite(730, 525, 'ammo_circle');
        ammo_circle.scale.setTo(.5, .5);
        ammo_circle.anchor.set(0.5);
        ammo_circle.fixedToCamera = true;
        ammoText = game.add.text(730, 525, ammo, { fontSize: '64px', fill: 'white' });
        ammoText.anchor.set(0.5);
        ammoText.fixedToCamera = true;

        // Lives
        life1 = game.add.sprite(770, 25, 'heart');
        life1.anchor.set(.5);
        life1.fixedToCamera = true;
        life2 = game.add.sprite(730, 25, 'heart');
        life2.anchor.set(.5);
        life2.fixedToCamera = true;
        life3 = game.add.sprite(690, 25, 'heart');
        life3.anchor.set(.5);
        life3.fixedToCamera = true;

        // Guns
        guns = game.add.group();
        gunText = game.add.text(700, 545, 'N/A', { fontSize: '32px', fill: 'white'});
        gunText.fixedToCamera = true;
        var pistol = change_gun(guns, 0, 410, 600);

        // Buttons
        respawn_button = game.add.button(400, 300, 'respawn', respawn_player, this);
        respawn_button.anchor.set(.5);
        respawn_button.fixedToCamera = true;
        respawn_button.visible = false;
    },

    update: function() {

        game.physics.arcade.collide(player, edges);
        game.physics.arcade.collide(player, obstacles);
        game.physics.arcade.overlap(player, exit, load_level1, null, this);

        // Adjust Text
        ammoText.x = Math.floor(ammo_circle.x + ammo_circle.width / 2);
        ammoText.y = Math.floor(ammo_circle.y + ammo_circle.height / 2);
        gunText.x = Math.floor(ammo_circle.x + ammo_circle.width / 2);
        gunText.y = Math.floor(ammo_circle.y + ammo_circle.height / 2);

        // Mouse Coordinates
        var mX = game.input.mousePointer.x;
        var mY = game.input.mousePointer.y;
        player.angle = (Math.atan2(player.position.x - mX, player.position.y - mY)  * -57.2957795) + 180;
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
        
        // Player Movement
        if (wasd.left.isDown)
        {
            //  Move to the left
            player.animations.play('walk', 25, true);
            player.body.velocity.x = -400;
        }
        else if (wasd.right.isDown)
        {
            //  Move to the right
            player.animations.play('walk', 25, true);
            player.body.velocity.x = 400;
        }
        else if (wasd.up.isDown) {
            player.animations.play('walk', 25, true);
            player.body.velocity.y = -400;   
        }
        else if (wasd.down.isDown) {
            player.animations.play('walk', 25, true);
            player.body.velocity.y = 400;    
        }
        else {
            player.animations.stop();
            player.frame = 1;
        }
        
        // Manage guns
        if (current_weapon == 0) {
            semi = true;
        }

        // Check Collisions
        health_powerups.forEach(function(health) {
            game.physics.arcade.overlap(player, health, c_Health, null, this);
        });
        guns.forEach(function(gun) {
            game.physics.arcade.overlap(player, gun, c_Gun, null, this);
        });
    }
};