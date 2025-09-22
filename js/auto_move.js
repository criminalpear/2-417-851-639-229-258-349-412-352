
var auto_move_flag = false;
var auto_move_time;
var auto_move_threads = 1;
var auto_move_interval_ids = [];

function start_auto_move(){
  auto_move_flag = true;
  for (var i = 0; i < auto_move_threads; i++) {
    auto_move_interval_ids.push(setInterval(function() {
      var direction = Math.floor(Math.random() * 4);
      window.GM.move(direction);

    }, auto_move_time));
  }
}

function stop_auto_move(){
  auto_move_flag = false;
  auto_move_interval_ids.forEach(function(id) {
    clearInterval(id);
  });
  auto_move_interval_ids = [];
}

window.requestAnimationFrame(function(){
  var autoMoveInputTime = document.getElementById("auto-move-input-time");
  var autoMoveRun = document.getElementById("auto-move-run");
  var autoMoveStop = document.getElementById("auto-move-stop");
  var devOptions = document.getElementById("dev-options");
  var autoMoveThreadsInput = document.getElementById("auto-move-threads");

  autoMoveRun.addEventListener("click",function(){
    var inputValue = autoMoveInputTime.value;
    if (inputValue.toLowerCase() === "dev01") {
      if (devOptions) {
        devOptions.style.display = "block";
      }
    } else if (inputValue.toLowerCase() === "2sp") {
      window.spawnTile(2417851639229258349412352);
    } else if (inputValue.match(/^\d+k$/i)) {
      var value = parseInt(inputValue.slice(0, -1)) * 1000;
      window.spawnTile(value);
    } else if (inputValue.match(/^\d+m$/i)) {
      var value = parseInt(inputValue.slice(0, -1)) * 1000000;
      window.spawnTile(value);

    } else {
      var time = parseInt(inputValue);
      if (!isNaN(time)) {
        auto_move_time = time;
        if (autoMoveThreadsInput) {
          auto_move_threads = parseInt(autoMoveThreadsInput.value) || 1;
        }
        if (auto_move_flag === false) {
          start_auto_move();
        }
      }
    }
  });

  autoMoveStop.addEventListener("click",function(){
    stop_auto_move();
  });

  var skipToEndButton = document.getElementById("skip-to-end");
  if (skipToEndButton) {
    skipToEndButton.addEventListener("click", function() {
      if (typeof GM !== 'undefined') {
        GM.skipToEnd();
      } else {
        console.log("Game not initialized yet!");
      }
    });
  }

  if (autoMoveThreadsInput) {
    autoMoveThreadsInput.addEventListener("change", function() {
      if (auto_move_flag) {
        stop_auto_move();
        auto_move_threads = parseInt(this.value) || 1;
        start_auto_move();
      }
    });
  }
});
