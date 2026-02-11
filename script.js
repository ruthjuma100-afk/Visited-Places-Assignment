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

// TDD

test("creates a place with correct properties", () => {
    const place = new Place("Paris", "Summer", "Visited Eiffel Tower");
    expect(place.location).toBe("Paris");
    expect(place.timeOfYear).toBe("Summer");
    expect(place.notes).toBe("Visited Eiffel Tower");
    expect(place.landmarks).toEqual([]);
    expect(place.id).toBeType("number");
});

test("adds a landmark to a place", () => {
    const place = new Place("Rome", "Spring");
    place.addLandmark("Colosseum");
    expect(place.landmarks).toEqual(["Colosseum"]);
});

test("travel tracker adds a place", () => {
    const tracker = new TravelTracker();
    const place = new Place("London", "Winter");
    tracker.addPlace(place);
    expect(tracker.places.length).toBe(1);
    expect(tracker.places[0]).toBe(place);
});

test("finds a place by id", () => {
    const tracker = new TravelTracker();
    const place = new Place("New York", "Fall");
    tracker.addPlace(place);
    const found = tracker.findPlaceById(place.id);
    expect(found).toBe(place);
});

test("deletes a place by id", () => {
    const tracker = new TravelTracker();
    const place1 = new Place("Tokyo", "Summer");
    const place2 = new Place("Kyoto", "Spring");
    tracker.addPlace(place1);
    tracker.addPlace(place2);
    tracker.deletePlace(place1.id);
    expect(tracker.places.length).toBe(1);
    expect(tracker.places[0]).toBe(place2);
});

const tracker = new TravelTracker();

// localStorage helpers

function savePlaces() {
    localStorage.setItem("places", JSON.stringify(tracker.places));
}

// localStorage helpers

function savePlaces() {
    localStorage.setItem("places", JSON.stringify(tracker.places));
}

function loadPlaces() {
    const saved = localStorage.getItem("places");
    if (saved) {
        try {
    
    const placesData = JSON.parse(saved);
    tracker.places = placesData.map(p => {
                
    const place = new Place(p.location, p.timeOfYear, p.notes);
    place.id = p.id;
    place.landmarks = p.landmarks;
    
    return place;
    
});
 // Update nextId to avoid collisions
    
    if (tracker.places.length > 0) {
    Place.nextId = Math.max(...tracker.places.map(p => p.id));
    }
    } catch (e) {
    console.error("Failed to load places from localStorage");
    }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    
    const placeForm = document.getElementById("placeForm");
    const placesList = document.getElementById("placesList");
    const placeSummary = document.getElementById("placeSummary");
    
    if (!placeForm || !placesList || !placeSummary) 
    return;

    // Load places from localStorage
    loadPlaces();

    // Display places

    function displayPlaces() {
        placesList.innerHTML = "";
        tracker.places.forEach(place => {
            const li = document.createElement("li");
            li.textContent = place.location;
            li.dataset.id = place.id;
            li.style.cursor = "pointer";
            placesList.appendChild(li);
        });
    }
