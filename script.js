// Mini TDD helpers

function test(description, fn) {
    try {
        fn();
        console.log(description);
    } catch (error) {
        console.error(description);
        console.error(error.message);
    }
}

function expect(value) {
    return {
        toBe(expected) {
            if (value !== expected) throw new Error(`${value} is not ${expected}`);
        },
        toEqual(expected) {
            if (JSON.stringify(value) !== JSON.stringify(expected)) {
                throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(value)}`);
            }
        },
        toBeType(type) {
            if (typeof value !== type) throw new Error(`Expected type ${type}, got ${typeof value}`);
        },
        toBeDefined() {
            if (value === undefined) throw new Error("Value is undefined");
        }
    };
}

// Place constructor

function Place(location, timeOfYear, notes) {
    this.id = (Place.nextId = (Place.nextId || 0) + 1);
    this.location = location;
    this.timeOfYear = timeOfYear;
    this.notes = notes || "";
    this.landmarks = [];
}

Place.prototype.addLandmark = function(landmark) {
    if (landmark) this.landmarks.push(landmark);
};

// TravelTracker constructor

function TravelTracker() {
    this.places = [];
}

TravelTracker.prototype.addPlace = function(place) {
    this.places.push(place);
};

TravelTracker.prototype.findPlaceById = function(id) {
    return this.places.find(p => p.id === id);
};

TravelTracker.prototype.deletePlace = function(id) {
    this.places = this.places.filter(p => p.id !== id);
};