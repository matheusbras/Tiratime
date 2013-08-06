var TiraTime = {
  numberOfTeams: 0,
  numberOfPlayers: 0,
  playersNames: [],
  playersInputObjects: [],
  currentPlayer: 0,

  initialize: function() {
    console.log("Initializing")
    this.firstStepSetup();
  },

  validateFirstStep: function() {
    var teamsInput = $("#number-of-teams"),
        playersInput = $("#number-of-players"),
        valid = false;

    teamsInput.removeClass("invalid");
    playersInput.removeClass("invalid");

    if(!teamsInput.val()) {
      teamsInput.addClass("invalid");
    }

    if(!playersInput.val()) {
      playersInput.addClass("invalid");
    }

    if(playersInput.val() && teamsInput.val()) {
      this.numberOfTeams = teamsInput.val();
      this.numberOfPlayers = playersInput.val();
      valid = true;
    }

    return valid;
  },

  buildPlayersInputs: function() {
    var that = this;
    for(var i = 0; i < that.numberOfPlayers; i++) {
      that.playersInputObjects.push({ name: "player["+(i+1)+"]", placeholder: "Jogador " + (i+1) });
    }
  },

  setFirstPlayerInput: function() {
    var player = this.playersInputObjects[0];
    var firstPlayerInput = "<input type='text' name='"+player.name+ "' placeholder='"+player.placeholder+"'/>";
    $("#second-step .fields").html(firstPlayerInput);
  },

  nextPlayerInput: function() {
    var player = this.playersInputObjects[this.currentPlayer];
    var playerInput = "<input type='text' name='"+player.name+ "' placeholder='"+player.placeholder+"'/>";
    $("#second-step .fields").html(playerInput);
  },

  trackProgress: function() {
    $("#current-player").text(this.currentPlayer + 1);
    $("#total-players").text(this.numberOfPlayers);
  },

  validateSecondStep: function(input) {
    var valid = false;

    input.removeClass("invalid");

    if(!input.val()) {
      input.addClass("invalid");
    } else {
      this.playersNames.push(input.val());
      this.currentPlayer++;
      valid = true;
    }

    console.log(this.playersNames);

    return valid;
  },

  firstStepSetup: function() {
    var that = this;
    $("#first-step-submit").on("click", function(e){
      e.preventDefault();
      if(that.validateFirstStep()) that.secondStep();
    });
  },

  secondStep: function() {
    $("#first-step").hide();
    this.trackProgress();
    this.buildPlayersInputs();
    this.setFirstPlayerInput();
    $("#second-step").show();

    $("#second-step .fields input").focus();

    var that = this;

    $("#second-step-submit").on("click", function(e) {
      e.preventDefault();
      if(that.validateSecondStep($("#second-step .fields input"))) that.secondStepSubmit();
    })
  },

  secondStepSubmit: function() {
    if((this.currentPlayer + 1) >= this.numberOfPlayers) {
      // TODO: Make the sorting. Maybe use Ruby.js
      // this.sortTeams();
      // this.showTeams();
    } else {
      this.trackProgress();
      this.nextPlayerInput();
      $("#second-step .fields input").focus();
    }
  },


};

TiraTime.initialize();