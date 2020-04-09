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
    const result = instructors.reduce((obj, instructor) => {
      instructor.teaches.forEach(skill => {
        !obj[skill] && (obj[skill] = []);
        (obj[skill] && !obj[skill].includes(instructor.name)) && obj[skill].push(instructor.name);
      });
      return obj;
    }, {})
    return result;
  }
};

// DATASET: bosses, sidekicks from ./datasets/bosses
const bossPrompts = {
  bossLoyalty() {
    const bossArr = Object.values(bosses);
    const result = bossArr.reduce((acc, boss) => {
      let obj = {};
      obj.bossName = boss.name,
        obj.sidekickLoyalty = 0;
      sidekicks.forEach(sidekick => {
        (sidekick.boss === boss.name) && (obj.sidekickLoyalty += sidekick.loyaltyToBoss)
      });
      acc.push(obj);
      return acc;
    }, []);
    return result;
  }
};

// getting error
// DATASET: constellations, stars } from ./datasets/astronomy
const astronomyPrompts = {
  starsInConstellations() {
    const data = Object.values(constellations);
    const result = data.reduce((arr, constellation) => {
      constellation.stars.forEach(constar => {
        stars.forEach(star => {
          (star.name === constar) && arr.push(star);
        })
      })
      return arr;
    }, []);
    return result;
  },

  starsByColor() {
    const result = stars.reduce((arr, star) => {
      !arr[star.color] && (arr[star.color] = []);
      arr[star.color].push(star);
      return arr
    }, {});
    return result;
  },

  constellationsStarsExistIn() {
    const result = stars.sort((a, b) => a.visualMagnitude - b.visualMagnitude).map(star => star.constellation);
    result.splice(result.indexOf(''), 1);
    return result;
  }
};

// DATASET: charaters, weapons from ./datasets/ultima
const ultimaPrompts = {
  totalDamage() {
    const weaponsArr = Object.entries(weapons);
    const result = characters.reduce((sum, character) => {
      character.weapons.forEach(weapon => {
        weaponsArr.forEach(item => {
          (item[0] === weapon) && (sum += item[1].damage);
        });
      });
      return sum;
    }, 0);
    return result;
  },

  charactersByTotal() {
    const weaponsArr = Object.entries(weapons);
    const result = characters.reduce((arr, character) => {
      let totalDamage = 0;
      let totalRange = 0;
      weaponsArr.forEach(weapon => {
        if (character.weapons.includes(weapon[0])) {
          totalDamage += weapon[1].damage;
          totalRange += weapon[1].range;
        }
      });
      const obj = {
        [character.name]: {
          damage: totalDamage,
          range: totalRange
        }
      };
      arr.push(obj)
      return arr;
    }, []);
    return result;
  }
};

// DATASET: dinosaurs, humans, movies from ./datasets/dinosaurs
const dinosaurPrompts = {
  countAwesomeDinosaurs() {
    const dinos = Object.entries(dinosaurs);
    const awesomeDinos = dinos.reduce((acc, dino) => {
      dino[1].isAwesome && acc.push(dino[0])
      return acc;
    }, []);
    const result = movies.reduce((acc, movie) => {
      acc[movie.title] = 0;
      movie.dinos.forEach(dino => awesomeDinos.includes(dino) && acc[movie.title]++)
      return acc;
    }, {});
    return result;
  },

  averageAgePerMovie() {
    let people = Object.entries(humans);
    const result = movies.reduce((acc, movie) => {
      let totalAge = 0;
      movie.cast.forEach(actor => {
        people.forEach(person => {
          (person[0] === actor) && (totalAge += (movie.yearReleased - person[1].yearBorn));
        });
      });
      let avgAge = Math.floor(totalAge / movie.cast.length);
      !acc[movie.director] ? (acc[movie.director] = {
        [movie.title]: avgAge
      }) : acc[movie.director][movie.title] = avgAge;
      return acc
    }, {});
    return result;
  },

  uncastActors() {
    let actors = Object.entries(humans);

    let castActors = movies.reduce((actorsArr, movie) => {
      movie.cast.forEach(person => !actorsArr.includes(person) && actorsArr.push(person))
      return actorsArr;
    }, []);

    const people = actors.reduce((info, actor) => {
      if (!castActors.includes(actor[0])) {
        info.push({
          'imdbStarMeterRating': actor[1].imdbStarMeterRating,
          'name': actor[0],
          'nationality': actor[1].nationality
        });
      }
      return info;
    }, []);
    const result = people.sort((a, b) => (a.nationality > b.nationality) ? 1 : ((b.nationality > a.nationality) ? -1 : 0));
    return result;
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