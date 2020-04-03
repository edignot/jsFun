/* eslint-disable indent */
const {
  kitties
} = require('./datasets/kitties');
const {
  clubs
} = require('./datasets/clubs');
const {
  mods
} = require('./datasets/mods');
const {
  cakes
} = require('./datasets/cakes');
const {
  classrooms
} = require('./datasets/classrooms');
const {
  breweries
} = require('./datasets/breweries');
const {
  nationalParks
} = require('./datasets/nationalParks');
const {
  books
} = require('./datasets/books');
const {
  weather
} = require('./datasets/weather');
const {
  instructors,
  cohorts
} = require('./datasets/turing');
const {
  bosses,
  sidekicks
} = require('./datasets/bosses');
const {
  constellations,
  stars
} = require('./datasets/astronomy');
const {
  weapons,
  characters
} = require('./datasets/ultima');
const {
  dinosaurs,
  humans,
  movies
} = require('./datasets/dinosaurs');

// SINGLE DATASETS
// =================================================================

// DATASET: kitties from ./datasets/kitties
const kittyPrompts = {
  orangeKittyNames() {
    const orangeKitties = kitties
      .filter(kitty => kitty.color === 'orange')
      .map(kitty => kitty.name);
    // ['Tiger', 'Snickers']
    const result = orangeKitties;
    return result;
  },

  sortByAge() {
    const sortedByAge = kitties.sort((kitty1, kitty2) => {
      return kitty2.age - kitty1.age;
    });
    const result = sortedByAge;
    return result;
  },

  growUp() {
    const kittyArray = this.sortByAge();
    const grownBy2 = kittyArray.map(kitty => {
      kitty.age += 2;
      console.log(kitty);
      return kitty;
    });

    const result = grownBy2;
    return result;
  }
};

// DATASET: clubs from ./datasets/clubs
const clubPrompts = {
  membersBelongingToClubs() {
    const result = clubs.reduce((finalObj, club) => {
      // loop through each member
      club.members.forEach(member => {
        // if member name is not a key yet- set it as a key
        if (!finalObj[member]) {
          finalObj[member] = [];
        }
        finalObj[member].push(club.club);
        // push the clubs name into that member array
      });
      return finalObj;
    }, {});
    return result;
  }
};

// DATASET: mods from ./datasets/mods
const modPrompts = {
  studentsPerMod() {
    const result = mods.reduce((finalArray, thisMod) => {
      let modObj = {
        mod: thisMod.mod,
        studentsPerInstructor: thisMod.students / thisMod.instructors
      };
      finalArray.push(modObj);
      return finalArray;
    }, []);
    return result;
  }
};

// DATASET: cakes from ./datasets/cakes
const cakePrompts = {
  stockPerCake() {
    const result = cakes.reduce((finalArr, cake) => {
      let newCake = {
        flavor: cake.cakeFlavor,
        inStock: cake.inStock
      };
      finalArr.push(newCake);
      return finalArr;
    }, []);
    return result;
  },

  onlyInStock() {
    const result = cakes.filter(cake => cake.inStock > 0);
    return result;
  },

  totalInventory() {
    const result = cakes.reduce((totalCakes, cake) => {
      return totalCakes += cake.inStock;
    }, 0);
    return result;
  },

  allToppings() {
    const result = cakes.reduce((allToppings, cake) => {
      cake.toppings.forEach(topping => {
        if (!allToppings.includes(topping)) {
          allToppings.push(topping)
        }
      })
      return allToppings;
    }, [])
    return result;
  },

  // FINISH
  groceryList() {
    const result = cakes.reduce((groceryObj, cake) => {
      cake.toppings.forEach(topping => {
        (!groceryObj.topping) && (groceryObj.topping = 0);
        groceryObj.topping += 1;
      })
      return groceryObj;
    }, {});
    return result;
  }
};

// DATASET: classrooms from ./datasets/classrooms
const classPrompts = {
  feClassrooms() {
    const result = classrooms.filter(classroom => classroom.program === 'FE');
    return result;
  },

  totalCapacities() {
    let feNumber = 0;
    let beNumber = 0;
    classrooms.forEach(classroom => {
      if (classroom.program === 'FE') {
        feNumber += classroom.capacity;
      } else if (classroom.program === 'BE') {
        beNumber += classroom.capacity;
      }
    });
    const result = classrooms.reduce((capacityObj, classroom) => {
      capacityObj.feCapacity = feNumber;
      capacityObj.beCapacity = beNumber;
      return capacityObj;
    }, {})
    return result;
  },

  sortByCapacity() {
    const result = classrooms.sort((a, b) => a.capacity - b.capacity);
    return result;
  }
};

// DATASET: books from './datasets/books
const bookPrompts = {
  removeViolence() {
    const result = books.reduce((titleArr, book) => {
      book.genre !== 'Horror' && book.genre !== 'True Crime' && titleArr.push(book.title);
      return titleArr;
    }, [])
    return result;
  },

  getNewBooks() {

    const result = books.reduce((newBookArr, book) => {
      if (book.published >= 1990) {
        let newBook = {
          title: book.title,
          year: book.published
        };
        newBookArr.push(newBook);
      }
      return newBookArr;
    }, [])
    return result;
  }
};

// DATASET: weather from './datasets/weather
const weatherPrompts = {
  getAverageTemps() {
    const result = weather.reduce((avgTempArr, location) => {
      let avgTemp = (location.temperature.high + location.temperature.low) / 2;
      avgTempArr.push(avgTemp);
      return avgTempArr;
    }, []);
    return result;
  },

  // findSunnySpots() {
  //   const result = weather.reduce((sunnyArr, place) => {
  //       (place.type === 'sunny' || place.type === 'mostly sunny') &&
  //       sunnyArr.push(`${place.location} is ${place.type}.`);
  //       return sunnyArr;
  //     },
  //     []);
  //   return result;
  // },

  findSunnySpots() {
    const result = weather.reduce((sunnyArr, place) => {
        (place.type === 'sunny' || place.type === 'mostly sunny') &&
        sunnyArr.push(`${place.location} is ${place.type}.`);
        return sunnyArr;
      },
      []);
    return result;
  },



  findHighestHumidity() {
    const result = weather.sort((a, b) => b.humidity - a.humidity)[0];
    return result;
  }
};

// DATASET: nationalParks from ./datasets/nationalParks
const nationalParksPrompts = {
  getParkVisitList() {
    const result = nationalParks.reduce((statusObj, park) => {
      park.visited && statusObj.parksVisited.push(park.name);
      !park.visited && statusObj.parksToVisit.push(park.name);
      return statusObj;
    }, {
      parksToVisit: [],
      parksVisited: []
    });
    return result;
  },

  getParkInEachState() {
    const result = nationalParks.reduce((parksArr, park) => {
      let newPark = {
        [park.location]: park.name
      };
      parksArr.push(newPark);
      return parksArr;
    }, []);
    return result;
  },

  getParkActivities() {
    const result = nationalParks.reduce((activityArr, park) => {
      park.activities.filter(activity => !activityArr.includes(activity) && activityArr.push(activity));
      return activityArr;
    }, []);
    return result;
  }
};

// DATASET: breweries from ./datasets/breweries
const breweryPrompts = {
  getBeerCount() {
    const result = breweries.reduce((count, brewery) => {
      count += brewery.beers.length;
      return count;
    }, 0);
    return result;
  },

  getBreweryBeerCount() {
    const result = breweries.reduce((brewArr, brewery) => {
      let brewInfo = {
        name: brewery.name,
        beerCount: brewery.beers.length
      };
      console.log(brewery);
      brewArr.push(brewInfo);
      return brewArr;
    }, []);
    return result;
  },

  findHighestAbvBeer() {
    let beers = [];
    breweries.forEach(brewery => {
      return brewery.beers.forEach(beer => {
        beers.push(beer);
      });
    });
    const result = beers.sort((a, b) => {
      return b.abv - a.abv;
    })[0];
    return result;
  }
};
// DOUBLE DATASETS
// =================================================================

// DATASET: instructors, cohorts from ./datasets/turing
const turingPrompts = {
  studentsForEachInstructor() {
    const result = instructors.reduce((instructorInfo, instructor) => {
      let cohort = cohorts.find(cohort => instructor.module === cohort.module);
      let newInstructor = {
        name: instructor.name,
        studentCount: cohort.studentCount
      };
      instructorInfo.push(newInstructor);
      return instructorInfo;
    }, []);
    return result;
  },

  studentsPerInstructor() {
    const result = cohorts.reduce((data, cohort) => {
      let instrucructorNum = instructors.filter(instructor => instructor.module === cohort.module).length;
      data[`cohort${cohort.cohort}`] = cohort.studentCount / instrucructorNum;
      console.log(data);
      return data;
    }, {});
    return result;
  },

  modulesPerTeacher() {
    const result = instructors.reduce((obj, instructor) => {
      obj[instructor.name] = [];
      cohorts.forEach(cohort => {
        cohort.curriculum.forEach(curr => {
          if (instructor.teaches.includes(curr)) {
            if (!obj[instructor.name].includes(cohort.module)) {
              obj[instructor.name].push(cohort.module);
            }
          }
        });
      });
      return obj;
    }, {});
    return result;
  },

  //   const result = instructors.reduce((obj, instructor) => {
  //     obj[instructor.name] = [];
  //     cohorts.forEach(cohort => {
  //       cohort.curriculum.forEach(curr => (instructor.teaches.includes(curr) && (!obj[instructor.name].includes(cohort.module) && obj[instructor.name].push(cohort.module))));
  //     });
  //     return obj;
  //   }, {});
  //   return result;
  // },

  curriculumPerTeacher() {
    // Return an object where each key is a curriculum topic and each value is
    // an array of instructors who teach that topic e.g.:
    // {
    //   html: [ 'Travis', 'Louisa' ],
    //   css: [ 'Travis', 'Louisa' ],
    //   javascript: [ 'Travis', 'Louisa', 'Christie', 'Will' ],
    //   recursion: [ 'Pam', 'Leta' ]
    // }

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  }
};

// DATASET: bosses, sidekicks from ./datasets/bosses
const bossPrompts = {
  bossLoyalty() {
    // Create an array of objects that each have the name of the boss and the sum
    // loyalty of all their sidekicks. e.g.:
    // [
    //   { bossName: 'Jafar', sidekickLoyalty: 3 },
    //   { bossName: 'Ursula', sidekickLoyalty: 20 },
    //   { bossName: 'Scar', sidekickLoyalty: 16 }
    // ]

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  }
};

// DATASET: constellations, stars } from ./datasets/astronomy
const astronomyPrompts = {
  starsInConstellations() {
    // Return an array of all the stars that appear in any of the constellations
    // listed in the constellations object e.g.
    // [
    //   { name: 'Rigel',
    //     visualMagnitude: 0.13,
    //     constellation: 'Orion',
    //     lightYearsFromEarth: 860,
    //     color: 'blue' },
    //   { name: 'Betelgeuse',
    //     visualMagnitude: 0.5,
    //     constellation: 'Orion',
    //     lightYearsFromEarth: 640,
    //     color: 'red' }
    // ]

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  starsByColor() {
    // Return an object with keys of the different colors of the stars,
    // whose values are arrays containing the star objects that match e.g.
    // {
    //   blue: [{obj}, {obj}, {obj}, {obj}, {obj}],
    //   white: [{obj}, {obj}],
    //   yellow: [{obj}, {obj}],
    //   orange: [{obj}],
    //   red: [{obj}]
    // }

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  constellationsStarsExistIn() {
    // Return an array of the names of the constellations that the brightest stars are part of e.g.

    //  [ "Canis Major",
    //    "Carina",
    //    "Boötes",
    //    "Auriga",
    //    "Orion",
    //    "Lyra",
    //    "Canis Minor",
    //    "The Plow",
    //    "Orion",
    //    "The Little Dipper" ]

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  }
};

// DATASET: charaters, weapons from ./datasets/ultima
const ultimaPrompts = {
  totalDamage() {
    // Return the sum of the amount of damage for all the weapons that our characters can use
    // Answer => 113

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  charactersByTotal() {
    // Return the sum damage and total range for each character as an object.
    // ex: [ { Avatar: { damage: 27, range: 24 }, { Iolo: {...}, ...}

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  }
};

// DATASET: dinosaurs, humans, movies from ./datasets/dinosaurs
const dinosaurPrompts = {
  countAwesomeDinosaurs() {
    // Return an object where each key is a movie title and each value is the
    // number of awesome dinosaurs in that movie. e.g.:
    // {
    //   'Jurassic Park': 5,
    //   'The Lost World: Jurassic Park': 8,
    //   'Jurassic Park III': 9,
    //   'Jurassic World': 11,
    //   'Jurassic World: Fallen Kingdom': 18
    // }

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  averageAgePerMovie() {
    /* Return an object where each key is a movie director's name and each value is
        an object whose key is a movie's title and whose value is the average age
        of the cast on the release year of that movie.
      e.g.:
      {
        'Steven Spielberg':
          {
            'Jurassic Park': 34,
            'The Lost World: Jurassic Park': 37
          },
        'Joe Johnston':
          {
            'Jurassic Park III': 44
          },
        'Colin Trevorrow':
          {
            'Jurassic World': 56
           },
        'J. A. Bayona':
          {
            'Jurassic World: Fallen Kingdom': 59
          }
      }
    */

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  uncastActors() {
    /*
    Return an array of objects that contain the names of humans who have not been cast in a Jurassic Park movie (yet), their nationality, and their imdbStarMeterRating. The object in the array should be sorted alphabetically by nationality.

    e.g.
      [{
        name: 'Justin Duncan',
        nationality: 'Alien',
        imdbStarMeterRating: 0
      },
      {
        name: 'Karin Ohman',
        nationality: 'Chinese',
        imdbStarMeterRating: 0
      },
      {
        name: 'Tom Wilhoit',
        nationality: 'Kiwi',
        imdbStarMeterRating: 1
      }, {
        name: 'Jeo D',
        nationality: 'Martian',
        imdbStarMeterRating: 0
      }]
    */

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  actorsAgesInMovies() {
    /*
    Return an array of objects for each human and the age(s) they were in the movie(s) they were cast in, as an array of age(s). Only include humans who were cast in at least one movie.

    e.g.
    [ { name: 'Sam Neill', ages: [ 46, 54 ] },
      { name: 'Laura Dern', ages: [ 26, 34 ] },
      { name: 'Jeff Goldblum', ages: [ 41, 45, 63, 66 ] },
      { name: 'Richard Attenborough', ages: [ 70, 74, 92, 95 ] },
      { name: 'Ariana Richards', ages: [ 14, 18 ] },
      { name: 'Joseph Mazello', ages: [ 10, 14 ] },
      { name: 'BD Wong', ages: [ 33, 55, 58 ] },
      { name: 'Chris Pratt', ages: [ 36, 39 ] },
      { name: 'Bryce Dallas Howard', ages: [ 34, 37 ] } ]
    */

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  }
};

module.exports = {
  breweryPrompts,
  turingPrompts,
  clubPrompts,
  bossPrompts,
  classPrompts,
  modPrompts,
  kittyPrompts,
  cakePrompts,
  astronomyPrompts,
  ultimaPrompts,
  nationalParksPrompts,
  weatherPrompts,
  bookPrompts,
  dinosaurPrompts
};