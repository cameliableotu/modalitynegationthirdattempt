

// Do show progress bar (fine!!)
var showProgressBar = true;

// Main shuffleSequence definition
var shuffleSequence = seq(
    'consent',
    'setcounter',
    'intro',
    'shared-intro',
    sepWith("timeoutSep", rshuffle(startsWith('MODALITYNEGATION'),startsWith('filler'))),
     'debrief');

// Using modified controller coded by Ethan Poole (Umass, 2017)
var DS= 'EPDashedAcceptabilityJudgment';

//  Set the Prolific Academic Completion URL
var sendingResultsMessage = "Vă rugăm să aşteptaţi. Răspunsurile dumneavoastră se trimit serverului."; 
var completionMessage = "Mulţumim pentru participare!"; 
var completionErrorMessage = "Eroare în trimiterea răspunsurilor dumneavoastră către server"; 

// Controller settings.
var defaults = [
    "QuestionAlt", {
        hasCorrect: 0,
        randomOrder: ['f','j'],
        presentHorizontally: true
},
     "EPDashedSentence", {
        mode: 'speeded acceptability',
        display: 'in place',
        blankText: '+',
        wordTime: 1000,
        wordPauseTime: 150
        },
        DS, {randomOrder: false,
        presentHorizontally: true,
        mode: 'speeded acceptability',
        display: 'in place',
        blankText: '+',
        wordTime: 250,
        wordPauseTime: 150,
        timeout: 3000,
        hasCorrect: false,
        q: ''},
  
     "AcceptabilityJudgment", {
        as: ["1", "2", "3", "4", "5", "6", "7"],            /// What are options on Likert scale? Define both # of options and their labels.
        presentAsScale: true,                               /// Should it be presented as a scale? 'true' or 'false'
        instructions: "Use number keys or click boxes to answer.",    /// Brief instructions present on each trial
        leftComment: "(Bad)", rightComment: "(Good)"        /// Labels on end-points of scale
    }
];

// Add breaks every 24 items
function modifyRunningOrder(ro)
{
    for (var i = 0; i < ro.length; ++i)
    {
        if (i % 24 == 1
            && i > 23
            && i < 250)
        {
            ro[i].push(new DynamicElement(
                "Message",
                {html: "<p>Vă rugăm să luaţi o mică pauză. Apăsaţi orice tastă când sunteţi gata să începeţi din nou.</p>", transfer: "keypress"},
            true));
            ro[i].push(new DynamicElement(
                "Separator",
                {transfer: 4000, normalMessage: "Atenţie! Primul fragment de propoziţie din acest set va apărea pe ecran în curând."},
            true));
        }
    }
    return ro;
}

// Items array.
var items = [

["consent", "Form", {consentRequired: true, html: {include: "consent.html"}}],
 ["setcounter", "__SetCounter__", { }],
["intro", "Form", {consentRequired: true, html: {include: "intro.html"}}],
["debrief", "Form", {consentRequired: true, html: {include: "debrief.html"}}],

['shared-intro', "Form", {consentRequired: false, html: {include: "shared_intro1.html"}}],

['shared-intro', "Form", {consentRequired: false, html: {include: "shared_intro2.html"}}],

['shared-intro', "Form", {consentRequired: false, html: {include: "shared_intro3.html"}}],


['shared-intro', Separator, { transfer: 1500, normalMessage: "+", errorMessage: "Răspuns greşit. Vă rugăm să citiți cu atenție."}, DS, {s: "Această propoziţie e menită să vă obişnuiască cu stilul de lectură."}],
['shared-intro', Separator, { transfer: 1500, normalMessage: "+", errorMessage: "Răspuns greşit. Vă rugăm să citiți cu atenție."}, DS, {s: "Această propoziţie este un pic mai complicată decȃt propoziţia pe care aţi citit-o mai înainte."}],

['shared-intro', Message, {consentRequired: false,
                   html: ["div",
                           ["p", "Cum vi s-a părut?"],
                           ["p", "Citiți cu atenție, avȃnd grijă să înțelegeți fiecare cuvȃnt. Hai să mai exersăm un pic."]
                         ]}],

['shared-intro', Separator, { transfer: 1500, normalMessage: "+", errorMessage: "Răspuns greşit. Vă rugăm să citiți cu atenție."}, DS, {s: "La bal, prinţul a valsat frumos şi a zȃmbit prinţesei."},"QuestionAlt", {q: "Cine a zȃmbit?", as: ['Prinţul','Prinţesa']}],
['shared-intro', Separator, { transfer: 1500, normalMessage: "+", errorMessage: "Răspuns greşit. Vă rugăm să citiți cu atenție."}, DS, {s: "Iepurii au alergat mult aseară."}],
['shared-intro', Separator, { transfer: 1500, normalMessage: "+", errorMessage: "Răspuns greşit. Vă rugăm să citiți cu atenție."}, DS, {s: "Miruna a stat toată noaptea cu fiul ei."},"QuestionAlt", {q: "Cine a stat toată noaptea cu fiul ei?", as: ['Miruna','Marina']}],
['shared-intro', Separator, { transfer: 1500, normalMessage: "+", errorMessage: "Răspuns greşit. Vă rugăm să citiți cu atenție."}, DS, {s: "Barista a pregătit un latte fără niciun chef şi nici măcar nu a făcut vreun design."}],

['shared-intro', Message, {consentRequired: false,
                   html: ["div",
                           ["p", "Bun, gata cu exersatul! Apăsaţi orice tastă când sunteţi gata să începeţi."]
                        ]}],

['shared-intro',"Separator",{transfer: 4000, normalMessage: "Atenţie! Prima propoziţie din acest set va apărea pe ecran în curând."}],

["timeoutSep", Separator, { transfer: 1500, normalMessage: "+", errorMessage: "Răspuns greşit. Vă rugăm să citiți cu atenție."}],

//// Shared experimental items + fillers
[["MODALITYNEGATION-notnecessary",1], "EPDashedSentence", {s:"+"}, DS, {s:"In 'You mustn't worry. The woman will give you the money', 'You mustn't worry' means",as: [['s','It is neccessary that you do not worry.'],['k','It is not necessary that you worry.']]},
                                      "AcceptabilityJudgment", {s: "How acceptable do you think 'You mustn't worry' is in the context?"}],
[["MODALITYNEGATION-necessarynot",1],  "EPDashedSentence", {s:"+"}, DS, {s:"In 'You mustn't worry. You will get sick otherwise.', 'You mustn't worry' means",as: [['s','It is necessary that you do not worry.'],['k','It is not necessary that you worry.']]},
                                      "AcceptabilityJudgment", {s: "How acceptable do you think 'You mustn't worry' is in the context?"}],
[["MODALITYNEGATION-notnecessary",2],  "EPDashedSentence", {s:"+"}, DS,{s:"In 'He mustn't panic. The teacher will give the class an easy test.', 'He mustn't panic' means",as: [['s','It is necessary that he does not panic.'],['k','It is not necessary that he panics.']]}, 
                                       "AcceptabilityJudgment", {s: "How acceptable do you think 'You mustn't panic' is in the context?"}],
[["MODALITYNEGATION-notnecessary",2], "EPDashedSentence", {s:"+"}, DS,{s:"In 'He mustn't panic. The teacher will give the class an easy test.', 'He mustn't panic' means",as: [['s','It is necessary that he does not panic.'],['k','It is not necessary that he panics.']]}, 
                                       "AcceptabilityJudgment", {s: "How acceptable do you think 'You mustn't panic' is in the context?"}],
[["MODALITYNEGATION-notnecessary",3], "EPDashedSentence", {s:"+"}, DS,{s:"In 'She mustn't be sad. Her mom will find the doll.', 'She mustn't be sad' means",as: [['s','It is necessary that she is not sad.'],['k','It is not necessary that she is sad.']]}, 
                                       "AcceptabilityJudgment", {s: "How acceptable do you think 'She mustn't be sad' is in the context?"}],
[["MODALITYNEGATION-necessarynot",3],   "EPDashedSentence", {s:"+"}, DS,{s:"In 'She mustn't be sad. She will ruin the party otherwise.', 'She mustn't be sad' means", as: [['s','It is necessary that she is not sad.'],['k','It is not necessary that she is sad.']]},
                                       "AcceptabilityJudgment", {s: "How acceptable do you think 'She mustn't be sad.' is in the context?"}],
[["MODALITYNEGATION-notnecessary",4], "EPDashedSentence", {s:"+"}, DS, {s:"In 'You mustn't be angry. The man will reward you for your efforts.', 'You mustn't be angry.' means",as: [['s','It is necessary that you are not angry.'],['k','It is not necessary that you are angry.']]}, 
                                       "AcceptabilityJudgment", {s: "How acceptable do you think 'You mustn't be angry.' is in the context?"}],
[["MODALITYNEGATION-necessarynot",4], "EPDashedSentence", {s:"+"},DS,{s:"In 'You mustn't be angry. Your mother will punish you otherwise.','You mustn't be angry.' means",as: [['s','It is necessary that you are not angry'],['k','It is not necessary that you are angry']]},
                                       "AcceptabilityJudgment", {s: "How acceptable do you think 'You mustn't be angry.' is in the context?"}],
[["MODALITYNEGATION-notnecessary",5], "EPDashedSentence", {s:"+"},DS, {s:"In 'Tom mustn't eat the bread. It won't go stale by tomorrow.', 'Tom mustn't eat the bread.' means",as: [['s','It is necessary that Tom does not eat the bread.'],['k','It is not necessary that Tom eats the bread.']]},
                                       "AcceptabilityJudgment", {s: "How acceptable do you think 'Tom mustn't eat the bread.' is in the context?"}],
[["MODALITYNEGATION-necessarynot",5], "EPDashedSentence", {s:"+"},DS,{s:"In 'Tom mustn't eat the bread. They have visitors coming over.','Tom mustn't eat the bread.' means",as: [['s','It is necessary that Tom does not eat the bread.'],['k','It is not necessary that Tom eats the bread.']]},
                                       "AcceptabilityJudgment", {s: "How acceptable do you think 'Tom mustn't eat the bread.' is in the context?"}],
[["MODALITYNEGATION-notnecessary",6], "EPDashedSentence", {s:"+"},DS,{s:"In 'You mustn't do office work at home. You managed to get it done already.', 'You mustn't do office work.' means",as: [['s','It is necessary that you do not do office work.'],['k','It is not necessary that you do office work.']]},
                                       "AcceptabilityJudgment", {s: "How acceptable do you think 'You mustn't do office work at home.' is in the context?"}],
[["MODALITYNEGATION-necessarynot",6], "EPDashedSentence", {s:"+"},DS,{s:"In 'You mustn't do  office work at home. Your wife and kids will be upset.','You mustn't do office work.' means",as: [['s','It is necessary that you do not do office work.'],['k','It is not necessary that you do office work.']]},
                                      "AcceptabilityJudgment", {s: "How acceptable do you think 'You mustn't do office work at home.' is in the context?"}],
[["MODALITYNEGATION-notnecessary",7], "EPDashedSentence", {s:"+"},DS, {s:"In 'Linda mustn't speak German. All the German people in the office speak English.', 'You mustn't speak German.' means",as: [['s','It is necessary that you do not speak German.'],['k','It is not necessary that you speak German.']]},
                                       "AcceptabilityJudgment", {s: "How acceptable do you think 'Linda mustn't speak German.' is in the context?"}],
[["MODALITYNEGATION-necessarynot",7], "EPDashedSentence", {s:"+"},DS,{s:"In 'Linda mustn't speak German. Our guests only speak English.', 'You mustn't speak German.' means",as: [['s','It is necessary that you do not speak German.'],['k','It is not necessary that you speak German.']]},
                                        "AcceptabilityJudgment", {s: "How acceptable do you think 'Linda mustn't speak German.' is in the context?"}],
[["MODALITYNEGATION-notnecessary",8], "EPDashedSentence", {s:"+"},DS,{s:"In 'You mustn't drink alcohol. You are already in good spirits.', 'You mustn't drink alcohol.' means",as: [['s','It is necessary that you do not drink alcohol.'],['k','It is not necessary that you drink alcohol.']]},
                                      "AcceptabilityJudgment", {s: "How acceptable do you think 'You mustn't drink alcohol.' is in the context?"}],
[["MODALITYNEGATION-necessarynot",8], "EPDashedSentence", {s:"+"},DS,{s:"In 'You mustn't drink alcohol. It will make you feel sick.', 'You mustn't drink alcohol.' means",as: [['s','It is necessary that you do not drink alcohol.'],['k','It is not necessary that you drink alcohol.']]},
                                       "AcceptabilityJudgment", {s: "How acceptable do you think 'You mustn't drink alcohol.' is in the context?"}],


//// Fillers
[["filler-should",9],  "EPDashedSentence", {s:"+"},DS,  {s:"In 'Mary shouldn't be upset. Her father will give her a new car.', 'Mary shouldn't be upset.' means",as: [['s','It is necessary that Mary is not upset.'],['k','It is not necessary that Mary is upset.']]}],
[["filler-should",10], "EPDashedSentence", {s:"+"}, DS, {s:"You shouldn't be annoyed. Your wife will cook dinner for you.', 'You shouldn't be annoyed.' means",as: [['s','It is necessary that you are not annoyed.'],['k','It is not necessary that you are annoyed.']]}],
[["filler-should",11],  "EPDashedSentence", {s:"+"},DS, {s:"In 'Tim shouldn't cook rice. His girlfriend does not like it.', 'Tim shouldn't cook rice.' means",as: [['s','It is necessary that Tim does not cook rice.'],['k','It is not necessary that Tim cooks rice.']]}],
[["filler-should",12],  "EPDashedSentence", {s:"+"},DS, {s:"In 'You shouldn't write the first draft yourself. Linda is the first author.', 'You shouldn't write the first draft yourself.' means",as: [['s','It is necessary that you do not write the first draft yourself.'],['k','It is not necessary that you write the first draft yourself.']]}],
[["filler-need",13], "EPDashedSentence", {s:"+"},DS, {s:"In 'Tom needn't be offended. The woman didn't want to insult him at all.' means",as: [['s','It is necessary that Tom is not offended.'],['k','It is not necessary that Tom is offended.']]}],
[["filler-need",14], "EPDashedSentence", {s:"+"},DS, {s:"+"}, DS, {s:"In 'You needn't be outraged. The professor is simply joking a bit.', 'You needn't be outraged.' means",as: [['s','It is necessary that you are not outraged.'],['k','It is not necessary that you are outraged.']]}],
[["filler-need",15], "EPDashedSentence", {s:"+"},DS, {s:"In 'Sophie needn't tidy the room today. It still looks quite great.', 'Sophie needn't tidy the room today.' means",as: [['s','It is necessary that Sophie does not tidy the room.'],['k','It is not necessary that Sophie tidies the room.']]}],
[["filler-need",16], "EPDashedSentence", {s:"+"},DS, {s:"In 'You needn't draw all the materials yourself. You can hire a designer', 'You needn't draw all the materials yourself.' means",as: [['s','It is necessary that you do not draw all the materials yourself.'],['k','It is not necessary that you draw all the materials yourself.']]}]

];


