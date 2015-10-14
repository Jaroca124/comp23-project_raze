var level1State = {

    create: function() {

        health = 100;
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
        for (i = 0; i < 10; i++) {
            var rand = Math.floor((Math.random() * 3));
            var rocks = obstacles.create((((rand * i * 58) + 324*i) % 1500), (((rand * i * 154) + 540*i) % 1500), 'rock1');
            var rocks2 = obstacles.create((((rand * i * 23) + 989*i) % 1500), (((rand * i * 323) + 234* i) % 1500), 'rock2');
            rocks.scale.setTo(.2, .2);
            rocks2.scale.setTo(.2, .2);
            rocks.enableBody = true;
            rocks2.enableBody = true;
            rocks.body.immovable = true;
            rocks2.body.immovable = true;
        }
        edges = game.add.group();
        edges.enableBody = true;
        var size = 100;
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
                var bounds = edges.create((100 * (i - 25)) + 30, -10, 'tree1');
                var bounds2 = edges.create(100 * (i - 25), 60, 'tree2');
                bounds.enableBody = true;
                bounds2.enableBody = true;
                bounds.body.immovable = true;
                bounds2.body.immovable = true;
            }
            else if (i > (size / 2) - 1 && i < size - (size/4)) {
                var bounds = edges.create((100 * (i - 50)) + 50, 1400, 'tree1');
                var bounds2 = edges.create((100 * (i - 50)), 1350, 'tree2');
                bounds.enableBody = true;
                bounds2.enableBody = true;
                bounds.body.immovable = true;
                bounds2.body.immovable = true;
            }
            else if (i > size - (size/4) - 1 && i < size) {
                var bounds = edges.create(1400, (100 * (i - 75)) + -10, 'tree1');
                var bounds2 = edges.create(1400, 100 * (i - 75), 'tree2');
                bounds.enableBody = true;
                bounds2.enableBody = true;
                bounds.body.immovable = true;
                bounds2.body.immovable = true;
            }
        }

        // Initalizing Player
        //player.reset();
        
        console.log('Now in level 1');
        player = game.add.sprite(200, 400, 'player');
        //player.y = 200;
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
        
        // Add Gorilla Enemies
        gorillas = game.add.group();

        gorillas.enableBody = true;
        for (var j = 0; j < TIER_ONE_ENEMIES; j++) {
            var gorilla = Gorilla(gorillas, 300 + 100*j, 300 + 100*j, player);
        }

        var header = game.add.sprite(0, 0, 'header');
        header.fixedToCamera = true;

        // Health
        health_powerups = game.add.group();
        var healthbar_bg = game.add.sprite(0, 2, 'healthbar_bg');
        healthbar_bg.fixedToCamera = true;
        healthbar = game.add.sprite(2.75, 6, 'healthbar');
        healthbar.fixedToCamera = true;
        healthbar.cropEnabled = true;
        healthText = game.add.text(77.5, 10, health, { fontSize: '50px', fill: 'white'});
        healthText.fixedToCamera = true;

        //cropRect = new Phaser.Rectangle(0, 0, 70, 32.5);
        //healthbar.crop(cropRect);
        
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
        gunText = game.add.text(700, 545, '', { fontSize: '32px', fill: 'white'});
        gunText.fixedToCamera = true;

        // Buttons
        respawn_button = game.add.button(400, 300, 'respawn', respawn_player, this);
        respawn_button.anchor.set(.5);
        respawn_button.fixedToCamera = true;
        respawn_button.visible = false;
    },

    update: function() {

        //console.log('X: ' + player.x);
        //console.log('Y ' + player.y);

        game.physics.arcade.collide(player, edges);
        game.physics.arcade.collide(player, obstacles);

        // Adjust Ammo Text
        ammoText.x = Math.floor(ammo_circle.x + ammo_circle.width / 2);
        ammoText.y = Math.floor(ammo_circle.y + ammo_circle.height / 2);
        gunText.x = Math.floor(ammo_circle.x + ammo_circle.width / 2);
        gunText.y = Math.floor(ammo_circle.y + ammo_circle.height / 2);
        if (current_weapon == 0) {
            gunText.text = 'Pistol';
        }
        else if (current_weapon == 1) {
            gunText.text = 'Dual';
        }
        else if (current_weapon == 2) {
            gunText.text = 'Auto';
        }

        //cropRect.x = (health / 200) * healthbar.width;

        seconds = Math.floor(this.time.totalElapsedSeconds());
        if(last_health_spawn != seconds && seconds % 25 == 0){
            var new_health = create_item(health_powerups, 'health');
            last_health_spawn = seconds;
        }

        if(last_weapon_spawn != seconds && seconds % 30 == 0){
            if (current_weapon < 2) {
                var new_weapon = create_item(guns, 'gun');
                last_weapon_spawn = seconds;
            }
        }

        // Manage Ammo
        if (ammo < 1) {
            if (current_weapon > 0) {
                current_weapon--;
                ammo = 200;
                ammoText.text = ammo;
                guns.forEach(function(gun) {
                    gun.kill(true);
                });
            }
            else {
                if (!stashed_check) {
                    stashed_check = true;
                    stashed = game.time.now;
                }
                reload();
            }
        }

        // All Enemies Killed, Player Wins



        // Player Health, Game Over
        if (health <= 0) {
            player.kill(true);
            respawn_button.visible = true;
        }


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
        else if (current_weapon == 1) {
            semi = true;
        }
        else {
            semi = false;
        }

        // Pistol
        if (game.input.activePointer.isDown && semi == true && current_weapon == 0) { 
            if (!fired && ammo > 0) {    
                weapons[0].fire(player, false);
                ammo--;
                ammoText.text = ammo;
                fired = true;
            }
        }
        // Dual Wield
        else if (game.input.activePointer.isDown && semi == true && current_weapon == 1 && ammo > 0) { 
            if (!fired) {    
                weapons[0].fire(player, true);
                ammo--;
                ammo--;
                ammoText.text = ammo;
                fired = true;
            }
        }
        // Automatic
        else if (game.input.activePointer.isDown && semi == false && ammo > 0) {
            ammo--;
            ammoText.text = ammo;
            weapons[0].fire(player, false);
        }
        else {
            fired = false;
        }

        // Check Collisions
        health_powerups.forEach(function(health) {
            game.physics.arcade.overlap(player, health, c_Health, null, this);
        });
        guns.forEach(function(gun) {
            game.physics.arcade.overlap(player, gun, c_Gun, null, this);
        });

        gorillas.forEach(function(gorilla) {
            game.physics.arcade.collide(gorillas, gorillas);
            game.physics.arcade.overlap(gorillas, gorillas, enemy_collide, null, this);
            gorilla.angle = game.physics.arcade.accelerateToObject(gorilla, player, 200, 200, 200);
            game.physics.arcade.collide(player, gorillas);
            game.physics.arcade.overlap(player, gorillas, collide, null, this);
        });

        // Player Physics
        game.physics.arcade.collide(player, gorillas);
        game.physics.arcade.overlap(player, gorillas, collide, null, this);
    }
};