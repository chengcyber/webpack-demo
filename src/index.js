import _ from 'lodash'
import './style.css'
import './styles2.css'
import printMe from './print.js'
import fetchRemote from './fetchRemote.js'

function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');
  var btn2 = document.createElement('button');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = function() {
    printMe();
    fetchRemote().then(
      function(res) {
        console.log(res)
      }
    );
  };

  btn2.innerHTML = 'Click me for bonus';
  btn2.onclick = function() {
    fetchRemote('/promotions').then(
      function(res) {
        console.log(res)
      }
    )
  }

  element.appendChild(btn);
  element.appendChild(btn2);

  return element;
}

document.body.appendChild(component());

if (module.hot) {
  console.log('->>> hot!')
  module.hot.accept('./print.js', function () {
    console.log('print js hot accept')
    printMe()
  })
}
