var FLAG_URL = "/assets/img/flags/";
var FLAG_IMG_FORMAT = ".png";
var FLAG_IMG_SIZE = "full/";
var FLAG_THUMB_SIZE = "thumb/";

var FLAG_DATA = "assets/data.json";

function FlagViewModel() {
    var self = this;

    self.gameState = ko.observable(State.MENU);
    self.countryIndex = ko.observable(0);
    self.currentCountry = ko.observable();

    //#region Data
    self.continents = ko.observableArray([]);
    self.countries = ko.observableArray([]);

    self.unAnswered = ko.computed(function () {
        return ko.utils.arrayFilter(self.countries(), function (country) {
            return !country.correct();
        });
    });

    self.unAnswered.subscribe(function (val) {
        if (self.unAnswered().length == 0) {
            self.gameState(State.FINISHED);
            clearInterval(self.intervalId());
        }
    });

    //#endregion
    //#region Settings
    self.duration = ko.observable(20);
    self.typeAhead = ko.observable(true);
    self.typeAheadUnswered = ko.observable(false);
    self.tabComplete = ko.observable(true);
    //#endregion

    self.errorMessage = ko.observable("");

    //#region Setup
    self.SetupCountries = function () {
        var selectedContinents = ko.utils.arrayMap(self.continents(), function (con) {
            return con.selected() ? con.id() : null;
        });

        var newCountryList = [];

        for (let i = 0; i < self.countries().length; i++) {
            var country = self.countries()[i];
            for (let i = 0; i < country.continents().length; i++) {
                if (selectedContinents.indexOf(country.continents()[i]) > -1) {
                    newCountryList.push(country);
                    break;
                }
            }
        }

        self.countries(newCountryList);
        self.Randomiser(self.countries);
    }
    self.SetupTimer = function () {
        self.timer(self.duration() * 60);

        self.intervalId(setInterval(function () {
            var newTimer = self.timer() - 1;
            if (newTimer <= 0) {
                self.gameState(State.FINISHED);
                clearInterval(self.intervalId());
                self.timer(0);
            } else {
                self.timer(newTimer);
            }
        }, 1000));
    }
    //#endregion
    //#region Timer
    self.intervalId = ko.observable();
    self.timer = ko.observable(0);

    self.minutes = ko.computed(function () {
        var mins = Math.floor(self.timer() / 60) % 60;
        return ("0" + mins).slice(-2);
    }, self);

    self.seconds = ko.computed(function () {
        var sec = self.timer() % 60;
        return ("0" + sec).slice(-2);
    }, self);
    //#endregion

    //#region UserInput
    self.guess = ko.observable("");
    self.guessFeedback = ko.observable("");

    self.guessFeedbackThrottle = ko.computed(function () {
        return self.guessFeedback();
    }).extend({ throttle: 400 });

    self.guessFeedbackThrottle.subscribe(function (val) {
        if (val != "") {
            self.guessFeedback("");
        }
    });


    self.guess.subscribe(function (val) {
        var nameMatch = val.toLowerCase() == self.currentCountry().name().toLowerCase();
        var knownasMatch = false;

        for (let i = 0; i < self.currentCountry().aka().length; i++) {
            if (!knownasMatch) {
                var aka = self.currentCountry().aka()[i];
                knownasMatch = aka.toLowerCase() == val.toLowerCase();
                break;
            }
        }

        if (nameMatch || knownasMatch) {
            self.currentCountry().correct(true);
            self.guessFeedback("correct");
            self.Next();
        }
    });

    self.prediction = ko.computed(function () {
        var guess = self.guess().toLowerCase();

        if (guess !== undefined && guess.length >= 3 && self.typeAhead()) {
            var list = self.typeAheadUnswered() ? self.unAnswered : self.countries;

            var match = "";

            var result = ko.utils.arrayFirst(list(), function(country) {
                var name = country.name().toLowerCase();

                if(name.startsWith(guess)){
                    match = name;
                    return true;
                }                 


                for (let i = 0; i < country.aka().length; i++) {
                        var aka = country.aka()[i].toLowerCase();
                        
                        if(aka.startsWith(guess)){
                            match = aka;
                            break;
                        }
                }


                return false;
            });

            if (match != "") {
                return self.guess() + match.toLowerCase().substring(self.guess().length);
            }
        }

        return "";
    });

    self.guessHasFocus = ko.observable(true);
    //#endregion

    //#region GameControls
    self.CheckSkip = function (data, event) {
        var key = event.keyCode;
        if (key == 37) {
            self.Prev();
        } else if (key == 39) {
            self.Next();
        } else if ((key == 13 || key == 9) && self.tabComplete()) {
            self.guessFeedback("incorrect");
            self.guess(self.prediction());
            return false;
        }

        return true;
    }

    self.Next = function () {
        var newIndex = self.countryIndex();

        while (self.unAnswered().length > 0) {
            newIndex++;

            if (newIndex >= self.countries().length) {
                newIndex = 0;
            }

            if (!self.countries()[newIndex].correct()) {
                break;
            }
        }

        self.countryIndex(newIndex);
        self.SetCurrent();
    }

    self.Prev = function () {
        var newIndex = self.countryIndex();

        while (self.unAnswered().length > 0) {
            newIndex--;

            if (newIndex <= -1) {
                newIndex = self.countries().length - 1;
            }

            if (!self.countries()[newIndex].correct()) {
                break;
            }
        }

        self.countryIndex(newIndex);
        self.SetCurrent();
    }

    self.SetCurrent = function () {
        self.currentCountry(self.countries()[self.countryIndex()]);
        self.guess("");
    }

    self.SelectCountry = function (country) {
        if (self.gameState() == State.INPROGRESS) {

            self.countryIndex(self.countries().indexOf(country));
            self.currentCountry(country);
            self.guess("");
            self.guessHasFocus(true);
        }
    }

    self.Restart = function () {
        self.countryIndex(0);
        self.currentCountry(undefined);

        self.errorMessage("");
        self.gameState(State.MENU);
        self.guess("");

        clearInterval(self.intervalId());
        self.intervalId(undefined);
        self.timer(0);

        self.Init();

    }

    self.GiveUp = function () {
        self.gameState(State.FINISHED);
        clearInterval(self.intervalId());
        self.intervalId(undefined);
    }
    //#endregion

    self.score = ko.computed(function () {
        var correct = ko.utils.arrayFilter(self.countries(), function (country) {
            return country.correct();
        });

        return correct.length;
    });

    self.countriesInContinents = function(continent){

        var countries = ko.utils.arrayFilter(self.countries(), function(country) {
            return country.continents().indexOf(continent()) > -1;
        });

        return "(" + countries.length + " Countries)";

    };

    self.elapsedTime = ko.computed(function () {
        var remain = (self.duration() * 60) - self.timer();
        return secondsToWords(remain);
    });

    self.StartGame = function () {
        var sc = ko.utils.arrayFilter(self.continents(), function (continent) {
            return continent.selected();
        });
        if (sc.length == 0) {
            self.errorMessage("Please select at least one continent!");
            return;
        } else if (isNaN(self.duration()) || self.duration() > 60) {
            self.errorMessage("The duration can't be more then 60 minutes!");
            return;
        } else if (isNaN(self.duration()) || self.duration() <= 0) {
            self.errorMessage("Please enter a duration in minutes!");
            return;
        } else {
            self.SetupTimer();
            self.SetupCountries();

            self.gameState(State.INPROGRESS);
            self.SetCurrent();
        }
    }

    //#region Initialization
    self.Init = function () {
        $.getJSON(FLAG_DATA, function (data) {
            var mapping = {
                'countries': {
                    create: function (options) {
                        return new Country(options.data);
                    }
                },
                'continents': {
                    create: function (options) {
                        return new Continent(options.data);
                    }
                }
            }
            ko.mapping.fromJS(data, mapping, self);
        });
    }

    self.Init();
    //#endregion

    //#region Util
    self.Randomiser = function (array) {
        var rndArray = [];
        while (array().length) {
            var rndIndex = Math.floor(Math.random() * array().length);
            rndArray.push(array().splice(rndIndex, 1)[0]);
        }
        array(rndArray);
    }
    //#endregion
}

function Country(data) {
    var self = this;
    ko.mapping.fromJS(data, {}, self);

    self.correct = ko.observable(false);

    self.imageSrc = ko.observable("");
    self.thumbnailSrc = ko.observable("");

    self.ImageUrl = function (size) {
        return FLAG_URL.concat(size, self.code(), FLAG_IMG_FORMAT);
    }

    self.Init = function () {
        self.imageSrc(self.ImageUrl(FLAG_IMG_SIZE));
        self.thumbnailSrc(self.ImageUrl(FLAG_THUMB_SIZE));
    }

    self.Init();
}

function Continent(data) {
    var self = this;
    ko.mapping.fromJS(data, {}, self);
}

const State = {
    MENU: "Menu",
    INPROGRESS: "InProgress",
    FINISHED: "Finished",
};


function secondsToWords(seconds) {
    var levels = [
        [Math.floor(seconds / 31536000), 'years'],
        [Math.floor((seconds % 31536000) / 86400), 'days'],
        [Math.floor(((seconds % 31536000) % 86400) / 3600), 'hours'],
        [Math.floor((((seconds % 31536000) % 86400) % 3600) / 60), 'minutes'],
        [(((seconds % 31536000) % 86400) % 3600) % 60, 'seconds'],
    ];
    var returntext = '';

    for (var i = 0, max = levels.length; i < max; i++) {
        if (levels[i][0] === 0) continue;
        returntext += ' ' + levels[i][0] + ' ' + (levels[i][0] === 1 ? levels[i][1].substr(0, levels[i][1].length - 1) : levels[i][1]);
    };
    return returntext.trim();
}

ko.applyBindings(new FlagViewModel());
