AFRAME.registerComponent('bowling-balls',{
    init:function(){
        this.throwBalls();
    },
    throwBalls:function(){
        window.addEventListener('keydown',(e)=>{
            if(e.key === 'z'){
                console.log('keypressed')
                var ball = document.createElement('a-entity');
                ball.setAttribute('gltf-model','./models/bowling_ball/scene.gltf');
                ball.setAttribute('scale',{x:3,y:3,z:3});
                var cam = document.querySelector('#camera');
                pos = cam.getAttribute('position');
                ball.setAttribute('position',{x:pos.x,y:pos.y-1.2,z:pos.z})
                var camera = document.querySelector('#camera').object3D
                var direction = new THREE.Vector3()
                camera.getWorldDirection(direction)
                ball.setAttribute('velocity',direction.multiplyScalar(-10))
                var scene = document.querySelector('#scene')
                ball.setAttribute('dynamic-body',{shape:'sphere',mass:'10'})
                ball.addEventListener('collide',this.removeBall)
                scene.appendChild(ball)
            }
        })
    },
    removeBall:function(e){
        console.log(e.detail.target.el)
        console.log(e.detail.body.el)
        var el = e.detail.target.el
        var elHit = e.detail.body.el
        if (elHit.id.includes('pin')){
          var impulse = new CANNON.Vec3(0,1,-15)
          var worldPoint = new CANNON.Vec3().copy(elHit.getAttribute('position'))
          elHit.body.applyForce(impulse,worldPoint)
          el.removeEventListener('collide',this.shoot)
          var scene = document.querySelector('#scene')
          scene.removeChild(el)
        }
      }
    });
