const quizQuestions = [
    {
      question:
        "If a pack of raw chicken fillets smell fine but are passed their use by date you can still cook and eat them",
      answers: [
       { id: 1, text: "True", isCorrect: false},
       { id: 2, text: "False", isCorrect: true},
      ],
      learningPoint: "The use by date is a safety measure and gives a deadline telling us when meat products will become unsafe to eat. So even if your food passes the sniff test with flying colours, we need to stick to the “use by date rigidly as the food could still be contaminate.",
    },
    {
      question:
        "The _______________ shows the last day a food should be EATEN.",
      answers: [
        { id: 1, text: "sell-by date", isCorrect: false},
        { id: 2, text: "expiration date", isCorrect: true},
        { id: 3, text: "best by date", isCorrect: false},
        
      ],
      learningPoint: "The expiration date is the last date food can be eaten. The best by date is the date the food will be at its best quality and flavour.",
    },
    {
      question: "The date stamped on milk is the _______________. ",
      answers: [
        { id: 1, text: "the date it was packaged", isCorrect: false },
        { id: 2, text: "sell-by", isCorrect: false },
        { id: 3, text: "use by date", isCorrect: true },
      ],
      learningPoint: "This date is provided to the grocery store by the milk processor to ensure that they sell the milk at its peak, so you can enjoy its delicious taste. Milk is generally good up to a week after its “sell by” date. This date is for you.",
    },
    {
      question:
        "Where is it NOT safe to store meat?",
      answers: [
        {id:1,text: "Refrigerator at 4 C or below", isCorrect: false},
        {id:2, text: "Room Temperature such as in a pantry", isCorrect: true },
        {id:3, text: "Freezer at -18 C or below", isCorrect: false},
      ],
      learningPoint: "It is not safe to store any type of meat at room temperature such as a pantry or cupboard. Storing meat in the freezer are for quality only and can be stored up to 4 to 12 months.",
    },
    {
      question:
        "After opening milk how long can it be refridgerated for?",
      answers: [
        {id:1,text: "3-4 Days", isCorrect: false},
        {id:2, text: "5-6 Days", isCorrect: false },
        {id:3, text: "7-8 Days", isCorrect: true},
      ],
      learningPoint: "Milk has a life expectancy of 7 days in the refrigerator.",
    },
    {
      question:
        "After opening jarred sauces such as pasta sauce, where do you store it?",
      answers: [
        {id:1, text: "In the refrigerator", isCorrect: true},
        {id:2, text: "In the cupboard", isCorrect: false},
        {id:3, text: "In the freezer", isCorrect: false },
      ],
      learningPoint: "You should never store opened food in the pantry after opening it.",
    },
    {
      question:
        "Are these salad leaves safe to eat?",
      answers: [
        {id:1,text: "True", isCorrect: true},
        {id:2, text: "False", isCorrect: false },
      ],
      learningPoint: "Generally, leaves with holes are safe for consumption. in the majority of cases, holes on leaves are due to insects such as slugs, caterpillars or plant disease. Which are harmless to humans. If the leaves presents signs of tears due to larger animals, not insects, the leaves should not be consumed.",
      image: "./images/questions/holes.jpg",
    },
    {
      question:
        "Are apples that have gone brown safe to eat?",
      answers: [
        {id:1,text: "Yes", isCorrect: true},
        {id:2, text: "No", isCorrect: false},
      ],
      learningPoint: "If the apple is kept at a safe temperature, it will not hurt you to eat it, even if it is a little brown. If the apple is not kept at safe temperature after being cut, as a general rule, 4 hours should be the cut off for eating it without worries.",
      image: "./images/questions/apple.jpg",
    },
    {
      question:
        "Eggs with blood spots are not safe to eat",
      answers: [
        {id:1,text: "True", isCorrect: false},
        {id:2, text: "False", isCorrect: true },
      ],
      learningPoint: "Eggs with blood spots are safe to eat. They can be eaten along with the egg or scraped off and discarded.",
      image: "./images/questions/egg.jpg",
    },

  ];

  export default quizQuestions;