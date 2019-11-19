const { expect } = require("chai");
const {
  formatDates,
  makeRefObj,
  formatComments
} = require("../db/utils/utils");

describe("formatDates", () => {
  it("should return an empty array of obj when passed one", () => {
    const actual = formatDates([]);
    const expected = [];
    expect(actual).to.eql(expected);
  });
  it("should return an arr with an obj with the correct date when passed an array with one obj ", () => {
    const actual = formatDates([
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: 1471522072389
      }
    ]);
    const expected = [
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: "18 Aug 2016 12:07:52"
      }
    ];
    expect(actual).to.eql(expected);
  });
  it("should return an arr with an obj with the correct date when passed an array with multiple obj ", () => {
    const actual = formatDates([
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: 1471522072389
      },
      {
        title:
          "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
        topic: "coding",
        author: "jessjelly",
        body:
          "Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.",
        created_at: 1500584273256
      },
      {
        title: "22 Amazing open source React projects",
        topic: "coding",
        author: "happyamy2016",
        body:
          "This is a collection of open source apps built with React.JS library. In this observation, we compared nearly 800 projects to pick the top 22. (React Native: 11, React: 11). To evaluate the quality, Mybridge AI considered a variety of factors to determine how useful the projects are for programmers. To give you an idea on the quality, the average number of Github stars from the 22 projects was 1,681.",
        created_at: 1500659650346
      }
    ]);
    const expected = [
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: "18 Aug 2016 12:07:52"
      },
      {
        title:
          "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
        topic: "coding",
        author: "jessjelly",
        body:
          "Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.",
        created_at: "20 Jul 2017 20:57:53"
      },
      {
        title: "22 Amazing open source React projects",
        topic: "coding",
        author: "happyamy2016",
        body:
          "This is a collection of open source apps built with React.JS library. In this observation, we compared nearly 800 projects to pick the top 22. (React Native: 11, React: 11). To evaluate the quality, Mybridge AI considered a variety of factors to determine how useful the projects are for programmers. To give you an idea on the quality, the average number of Github stars from the 22 projects was 1,681.",
        created_at: "21 Jul 2017 17:54:10"
      }
    ];
    expect(actual).to.eql(expected);
  });
  it("doesnt mutate stuff", () => {
    const arr = [
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: 1471522072389
      }
    ];
    expect(formatDates(arr)).to.not.equal(arr);
    expect(arr).to.eql([
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: 1471522072389
      }
    ]);
  });
});

describe("makeRefObj", () => {
  it("should return an empty object when passed an array ", () => {
    const actual = makeRefObj([]);
    const expected = {};
    expect(actual).to.eql(expected);
  });
  it("should return an object with right key-value when passed an array", () => {
    const actual = makeRefObj([
      {
        article_id: 36,
        title: "The vegan carnivore?",
        body:
          "The chef Richard McGeown has faced bigger culinary challenges in his distinguished career than frying a meat patty in a little sunflower oil and butter. But this time the eyes and cameras of hundreds of journalists in the room were fixed on the 5oz (140g) pink disc sizzling in his pan, one that had been five years and €250,000 in the making. This was the world’s first proper portion of cultured meat, a beef burger created by Mark Post, professor of physiology, and his team at Maastricht University in the Netherlands. Post (which rhymes with ‘lost’, not ‘ghost’) has been working on in vitro meat (IVM) since 2009. On 5 August this year he presented his cultured beef burger to the world as a ‘proof of concept’. Having shown that the technology works, Post believes that in a decade or so we could see commercial production of meat that has been grown in a lab rather than reared and slaughtered. The comforting illusion that supermarket trays of plastic-wrapped steaks are not pieces of dead animal might become a discomforting reality.",
        votes: 0,
        topic: "cooking",
        author: "tickle122",
        created_at: "2017-04-14T08:56:23.000Z"
      }
    ]);
    const expected = { "The vegan carnivore?": 36 };
    expect(actual).to.eql(expected);
  });
  it("should return an object with right key-values when passed an array of multiple obj ", () => {
    const actual = makeRefObj([
      {
        article_id: 36,
        title: "The vegan carnivore?",
        body:
          "The chef Richard McGeown has faced bigger culinary challenges in his distinguished career than frying a meat patty in a little sunflower oil and butter. But this time the eyes and cameras of hundreds of journalists in the room were fixed on the 5oz (140g) pink disc sizzling in his pan, one that had been five years and €250,000 in the making. This was the world’s first proper portion of cultured meat, a beef burger created by Mark Post, professor of physiology, and his team at Maastricht University in the Netherlands. Post (which rhymes with ‘lost’, not ‘ghost’) has been working on in vitro meat (IVM) since 2009. On 5 August this year he presented his cultured beef burger to the world as a ‘proof of concept’. Having shown that the technology works, Post believes that in a decade or so we could see commercial production of meat that has been grown in a lab rather than reared and slaughtered. The comforting illusion that supermarket trays of plastic-wrapped steaks are not pieces of dead animal might become a discomforting reality.",
        votes: 0,
        topic: "cooking",
        author: "tickle122",
        created_at: "2017-04-14T08:56:23.000Z"
      },
      {
        article_id: 35,
        title: "Stone Soup",
        body:
          "The first day I put my family on a Paleolithic diet, I made my kids fried eggs and sausage for breakfast. If they were still hungry, I told them, they could help themselves to more sausage, but they were not allowed to grab a slice of bread, or toast an English muffin, or pour themselves a bowl of cereal. This represented a reversal of the usual strictures, and they were happy to oblige. It was like some weird, unexpected holiday—Passover in July.",
        votes: 0,
        topic: "cooking",
        author: "cooljmessy",
        created_at: "2016-12-13T19:58:40.000Z"
      },
      {
        article_id: 34,
        title: "The Notorious MSG’s Unlikely Formula For Success",
        body:
          "The 'umami' craze has turned a much-maligned and misunderstood food additive into an object of obsession for the world’s most innovative chefs. But secret ingredient monosodium glutamate’s biggest secret may be that there was never anything wrong with it at all.",
        votes: 0,
        topic: "cooking",
        author: "grumpy19",
        created_at: "2017-08-16T21:08:30.000Z"
      }
    ]);
    const expected = {
      "The vegan carnivore?": 36,
      "Stone Soup": 35,
      "The Notorious MSG’s Unlikely Formula For Success": 34
    };
    expect(actual).to.eql(expected);
  });
  it("doesnt mutate the data", () => {
    const arr = [
      {
        article_id: 36,
        title: "The vegan carnivore?",
        body:
          "The chef Richard McGeown has faced bigger culinary challenges in his distinguished career than frying a meat patty in a little sunflower oil and butter. But this time the eyes and cameras of hundreds of journalists in the room were fixed on the 5oz (140g) pink disc sizzling in his pan, one that had been five years and €250,000 in the making. This was the world’s first proper portion of cultured meat, a beef burger created by Mark Post, professor of physiology, and his team at Maastricht University in the Netherlands. Post (which rhymes with ‘lost’, not ‘ghost’) has been working on in vitro meat (IVM) since 2009. On 5 August this year he presented his cultured beef burger to the world as a ‘proof of concept’. Having shown that the technology works, Post believes that in a decade or so we could see commercial production of meat that has been grown in a lab rather than reared and slaughtered. The comforting illusion that supermarket trays of plastic-wrapped steaks are not pieces of dead animal might become a discomforting reality.",
        votes: 0,
        topic: "cooking",
        author: "tickle122",
        created_at: "2017-04-14T08:56:23.000Z"
      }
    ];
    makeRefObj(arr);
    expect(arr).to.eql([
      {
        article_id: 36,
        title: "The vegan carnivore?",
        body:
          "The chef Richard McGeown has faced bigger culinary challenges in his distinguished career than frying a meat patty in a little sunflower oil and butter. But this time the eyes and cameras of hundreds of journalists in the room were fixed on the 5oz (140g) pink disc sizzling in his pan, one that had been five years and €250,000 in the making. This was the world’s first proper portion of cultured meat, a beef burger created by Mark Post, professor of physiology, and his team at Maastricht University in the Netherlands. Post (which rhymes with ‘lost’, not ‘ghost’) has been working on in vitro meat (IVM) since 2009. On 5 August this year he presented his cultured beef burger to the world as a ‘proof of concept’. Having shown that the technology works, Post believes that in a decade or so we could see commercial production of meat that has been grown in a lab rather than reared and slaughtered. The comforting illusion that supermarket trays of plastic-wrapped steaks are not pieces of dead animal might become a discomforting reality.",
        votes: 0,
        topic: "cooking",
        author: "tickle122",
        created_at: "2017-04-14T08:56:23.000Z"
      }
    ]);
  });
});

describe("formatComments", () => {
  it("returns an empty array when passed an empty array", () => {
    const refObj = { "Running a Node App": 1 };
    const actual = formatComments([], refObj);
    const expected = [];
    expect(actual).to.eql(expected);
  });
  it("returns an array with correct obj when passed an array with obj", () => {
    const refObj = { "Running a Node App": 1 };
    const actual = formatComments(
      [
        {
          body:
            "Ut accusamus enim vel voluptate quae temporibus labore neque a. Reprehenderit iste est eos velit fugit vel quod velit.",
          belongs_to: "Running a Node App",
          created_by: "cooljmessy",
          votes: 19,
          created_at: 1499256940563
        }
      ],
      refObj
    );
    const expected = [
      {
        body:
          "Ut accusamus enim vel voluptate quae temporibus labore neque a. Reprehenderit iste est eos velit fugit vel quod velit.",
        article_id: 1,
        author: "cooljmessy",
        votes: 19,
        created_at: "5 Jul 2017 12:15:40"
      }
    ];
    expect(actual).to.eql(expected);
  });
  it("returns an array with correct obj when passed an array with multiple obj", () => {
    const refObj = {
      "Running a Node App": 1,
      "Stone Soup": 35,
      "The Notorious MSG’s Unlikely Formula For Success": 34
    };
    const actual = formatComments(
      [
        {
          body:
            "Ut accusamus enim vel voluptate quae temporibus labore neque a. Reprehenderit iste est eos velit fugit vel quod velit.",
          belongs_to: "Running a Node App",
          created_by: "cooljmessy",
          votes: 19,
          created_at: 1499256940563
        },
        {
          body:
            "Veritatis animi et voluptates nesciunt officia facere eaque. Eligendi earum explicabo necessitatibus aut dolorem nisi esse nesciunt. Non iusto rem ut consequuntur quam ut rem sed. Velit laboriosam consectetur enim delectus eos sit veritatis eveniet perspiciatis.",
          belongs_to: "Stone Soup",
          created_by: "grumpy19",
          votes: -5,
          created_at: 1469442270839
        },
        {
          body:
            "Eaque fugiat est veniam ex praesentium et saepe molestias non. Est dolore et sint consequuntur.",
          belongs_to: "The Notorious MSG’s Unlikely Formula For Success",
          created_by: "jessjelly",
          votes: 12,
          created_at: 1481006023094
        }
      ],
      refObj
    );
    const expected = [
      {
        body:
          "Ut accusamus enim vel voluptate quae temporibus labore neque a. Reprehenderit iste est eos velit fugit vel quod velit.",
        article_id: 1,
        author: "cooljmessy",
        votes: 19,
        created_at: "5 Jul 2017 12:15:40"
      },
      {
        body:
          "Veritatis animi et voluptates nesciunt officia facere eaque. Eligendi earum explicabo necessitatibus aut dolorem nisi esse nesciunt. Non iusto rem ut consequuntur quam ut rem sed. Velit laboriosam consectetur enim delectus eos sit veritatis eveniet perspiciatis.",
        article_id: 35,
        author: "grumpy19",
        votes: -5,
        created_at: "25 Jul 2016 10:24:30"
      },
      {
        body:
          "Eaque fugiat est veniam ex praesentium et saepe molestias non. Est dolore et sint consequuntur.",
        article_id: 34,
        author: "jessjelly",
        votes: 12,
        created_at: "6 Dec 2016 5:33:43"
      }
    ];
    expect(actual).to.eql(expected);
  });
  it("doesnt mutate the data", () => {
    const refObj = { "Running a Node App": 1 };
    const arr = [
      {
        body:
          "Ut accusamus enim vel voluptate quae temporibus labore neque a. Reprehenderit iste est eos velit fugit vel quod velit.",
        belongs_to: "Running a Node App",
        created_by: "cooljmessy",
        votes: 19,
        created_at: 1499256940563
      }
    ];
    expect(formatComments(arr, refObj)).to.not.equal(arr);
    formatComments(arr, refObj);
    expect(arr).to.eql([
      {
        body:
          "Ut accusamus enim vel voluptate quae temporibus labore neque a. Reprehenderit iste est eos velit fugit vel quod velit.",
        belongs_to: "Running a Node App",
        created_by: "cooljmessy",
        votes: 19,
        created_at: 1499256940563
      }
    ]);
  });
});
