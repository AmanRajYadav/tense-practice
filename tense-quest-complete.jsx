// This file is written to run directly in the browser using React + Babel (no bundler).
// React and ReactDOM must be loaded globally from a CDN (see index.html).
const { useState, useEffect, useRef, useCallback } = React;

// Complete Questions Database - ALL questions exactly as given
const questions = [
  // =====================================
  // PRESENT TENSE
  // =====================================
  
  // Section A - Monsoon Passage (Fill in blanks)
  { id: 'PT-A1', type: 'fill', section: 'Present Tense', subsection: 'A. Fill in the blanks', text: 'Monsoons ________ in India and other tropical areas.', verb: 'occur', answer: 'occur', hint: 'Simple present for facts - plural subject takes base form' },
  { id: 'PT-A2', type: 'fill', section: 'Present Tense', subsection: 'A. Fill in the blanks', text: 'There ________ strong rainfall which continues for many days.', verb: 'be', answer: 'is', hint: 'There + is/are depends on the noun after it (rainfall = singular)' },
  { id: 'PT-A3', type: 'fill', section: 'Present Tense', subsection: 'A. Fill in the blanks', text: 'There is strong rainfall which ________ for many days.', verb: 'continue', answer: 'continues', hint: 'Rainfall (singular) + verb with -s' },
  { id: 'PT-A4', type: 'fill', section: 'Present Tense', subsection: 'A. Fill in the blanks', text: 'The monsoons ________ in India in June.', verb: 'arrive', answer: 'arrive', hint: 'Monsoons (plural) = no -s on verb' },
  { id: 'PT-A5', type: 'fill', section: 'Present Tense', subsection: 'A. Fill in the blanks', text: 'The monsoons ________ by mid-October.', verb: 'leave', answer: 'leave', hint: 'Monsoons (plural) = no -s on verb' },
  { id: 'PT-A6', type: 'fill', section: 'Present Tense', subsection: 'A. Fill in the blanks', text: 'Sometimes, it ________ too much and there are floods in most places.', verb: 'rain', answer: 'rains', hint: 'It + verb = add -s' },
  { id: 'PT-A7', type: 'fill', section: 'Present Tense', subsection: 'A. Fill in the blanks', text: 'Sometimes, it rains too much and there ________ floods in most places.', verb: 'be', answer: 'are', hint: 'There + are for plural (floods)' },
  { id: 'PT-A8', type: 'fill', section: 'Present Tense', subsection: 'A. Fill in the blanks', text: 'Other times, it ________ not rain at all and there are droughts.', verb: 'do', answer: 'does', hint: 'It + does for negative' },
  { id: 'PT-A9', type: 'fill', section: 'Present Tense', subsection: 'A. Fill in the blanks', text: 'Other times, it does not rain at all and there ________ droughts.', verb: 'be', answer: 'are', hint: 'There + are for plural (droughts)' },
  { id: 'PT-A10', type: 'fill', section: 'Present Tense', subsection: 'A. Fill in the blanks', text: 'Animals, plants and humans ________ a lot on the monsoons.', verb: 'depend', answer: 'depend', hint: 'Plural subjects = base form verb' },

  // Section B - Rewrite in given tense
  { id: 'PT-B1', type: 'rewrite', section: 'Present Tense', subsection: 'B. Rewrite in given tense', text: 'She made a life-size painting of the school.', targetTense: 'present continuous tense', answer: 'She is making a life-size painting of the school.', hint: 'Present continuous: is/am/are + verb-ing' },
  { id: 'PT-B2', type: 'rewrite', section: 'Present Tense', subsection: 'B. Rewrite in given tense', text: 'I have been watching the bird make its nest every morning.', targetTense: 'simple present tense', answer: 'I watch the bird make its nest every morning.', hint: 'Simple present: subject + base verb (I/you/we/they) or verb+s (he/she/it)' },
  { id: 'PT-B3', type: 'rewrite', section: 'Present Tense', subsection: 'B. Rewrite in given tense', text: 'He was questioned by his father about the broken window.', targetTense: 'present perfect tense', answer: 'He has been questioned by his father about the broken window.', hint: 'Present perfect: has/have + past participle' },
  { id: 'PT-B4', type: 'rewrite', section: 'Present Tense', subsection: 'B. Rewrite in given tense', text: 'They wait for the arrival of their cousins.', targetTense: 'present continuous tense', answer: 'They are waiting for the arrival of their cousins.', hint: 'Present continuous: is/am/are + verb-ing' },
  { id: 'PT-B5', type: 'rewrite', section: 'Present Tense', subsection: 'B. Rewrite in given tense', text: 'I watched TV all day.', targetTense: 'present perfect continuous tense', answer: 'I have been watching TV all day.', hint: 'Present perfect continuous: has/have + been + verb-ing' },
  { id: 'PT-B6', type: 'rewrite', section: 'Present Tense', subsection: 'B. Rewrite in given tense', text: 'This team is scoring goals very fast.', targetTense: 'simple present tense', answer: 'This team scores goals very fast.', hint: 'Simple present: subject + base verb or verb+s' },
  { id: 'PT-B7', type: 'rewrite', section: 'Present Tense', subsection: 'B. Rewrite in given tense', text: 'I had gone to visit my grandparents.', targetTense: 'present continuous tense', answer: 'I am going to visit my grandparents.', hint: 'Present continuous: is/am/are + verb-ing' },
  { id: 'PT-B8', type: 'rewrite', section: 'Present Tense', subsection: 'B. Rewrite in given tense', text: 'The little puppy chews everything that it sees.', targetTense: 'present perfect tense', answer: 'The little puppy has chewed everything that it has seen.', hint: 'Present perfect: has/have + past participle' },
  { id: 'PT-B9', type: 'rewrite', section: 'Present Tense', subsection: 'B. Rewrite in given tense', text: 'She will pack her bags.', targetTense: 'present perfect continuous tense', answer: 'She has been packing her bags.', hint: 'Present perfect continuous: has/have + been + verb-ing' },
  { id: 'PT-B10', type: 'rewrite', section: 'Present Tense', subsection: 'B. Rewrite in given tense', text: 'They work long hours.', targetTense: 'present continuous tense', answer: 'They are working long hours.', hint: 'Present continuous: is/am/are + verb-ing' },

  // Section C - Error Correction
  { id: 'PT-C1', type: 'error', section: 'Present Tense', subsection: 'C. Correct the errors', text: 'Ankita has already completing her Class XII exams.', answer: 'Ankita has already completed her Class XII exams.', hint: 'has/have + past participle (completed, not completing)' },
  { id: 'PT-C2', type: 'error', section: 'Present Tense', subsection: 'C. Correct the errors', text: 'Rohit has enrol in a college.', answer: 'Rohit has enrolled in a college.', hint: 'has/have + past participle (enrolled)' },
  { id: 'PT-C3', type: 'error', section: 'Present Tense', subsection: 'C. Correct the errors', text: 'Mohua has apply for several jobs.', answer: 'Mohua has applied for several jobs.', hint: 'has/have + past participle (applied)' },
  { id: 'PT-C4', type: 'error', section: 'Present Tense', subsection: 'C. Correct the errors', text: 'I seen some interesting advertisements.', answer: 'I have seen some interesting advertisements.', hint: 'Need auxiliary verb: have + past participle' },
  { id: 'PT-C5', type: 'error', section: 'Present Tense', subsection: 'C. Correct the errors', text: 'Jayant has decide to work in a bank.', answer: 'Jayant has decided to work in a bank.', hint: 'has/have + past participle (decided)' },
  { id: 'PT-C6', type: 'error', section: 'Present Tense', subsection: 'C. Correct the errors', text: 'I are not working at present.', answer: 'I am not working at present.', hint: 'I + am (not are)' },
  { id: 'PT-C7', type: 'error', section: 'Present Tense', subsection: 'C. Correct the errors', text: 'Why is all those people laughing?', answer: 'Why are all those people laughing?', hint: 'People = plural = are' },
  { id: 'PT-C8', type: 'error', section: 'Present Tense', subsection: 'C. Correct the errors', text: 'Shiv and his friends is practising judo.', answer: 'Shiv and his friends are practising judo.', hint: 'Shiv AND friends = plural = are' },
  { id: 'PT-C9', type: 'error', section: 'Present Tense', subsection: 'C. Correct the errors', text: 'What game is those children playing?', answer: 'What game are those children playing?', hint: 'Children = plural = are' },
  { id: 'PT-C10', type: 'error', section: 'Present Tense', subsection: 'C. Correct the errors', text: 'What you drinking?', answer: 'What are you drinking?', hint: 'Missing auxiliary: What ARE you drinking?' },

  // Section D - Present Continuous or Present Perfect Continuous
  { id: 'PT-D1', type: 'fill', section: 'Present Tense', subsection: 'D. Present Continuous or Perfect Continuous', text: 'It ________ continuously since yesterday.', verb: 'snow', answer: 'has been snowing', hint: '"Since yesterday" = perfect continuous (has/have been + verb-ing)' },
  { id: 'PT-D2', type: 'fill', section: 'Present Tense', subsection: 'D. Present Continuous or Perfect Continuous', text: 'She ________ him at 3:00 p.m. today.', verb: 'meet', answer: 'is meeting', hint: 'Specific future time = present continuous for planned action' },
  { id: 'PT-D3', type: 'fill', section: 'Present Tense', subsection: 'D. Present Continuous or Perfect Continuous', text: 'She ________ him on Sunday.', verb: 'see', answer: 'is seeing', hint: 'Planned future action = present continuous' },
  { id: 'PT-D4', type: 'fill', section: 'Present Tense', subsection: 'D. Present Continuous or Perfect Continuous', text: 'The children are tired because they ________ in the field all morning.', verb: 'play', answer: 'have been playing', hint: '"All morning" = duration = present perfect continuous' },
  { id: 'PT-D5', type: 'fill', section: 'Present Tense', subsection: 'D. Present Continuous or Perfect Continuous', text: 'He ________ the car for three hours.', verb: 'clean', answer: 'has been cleaning', hint: '"For three hours" = duration = present perfect continuous' },
  { id: 'PT-D6', type: 'fill', section: 'Present Tense', subsection: 'D. Present Continuous or Perfect Continuous', text: '________ you ________ on the graffiti tomorrow?', verb: 'work', answer: 'Are you working', hint: 'Tomorrow = future plan = present continuous question' },
  { id: 'PT-D7', type: 'fill', section: 'Present Tense', subsection: 'D. Present Continuous or Perfect Continuous', text: "My grandmother's backache ________ since she started doing yoga.", verb: 'improve', answer: 'has been improving', hint: '"Since" = present perfect continuous' },
  { id: 'PT-D8', type: 'fill', section: 'Present Tense', subsection: 'D. Present Continuous or Perfect Continuous', text: 'We ________ to find our way home for the last two hours.', verb: 'try', answer: 'have been trying', hint: '"For the last two hours" = duration = present perfect continuous' },
  { id: 'PT-D9', type: 'fill', section: 'Present Tense', subsection: 'D. Present Continuous or Perfect Continuous', text: 'The people who ________ to office by foot now should take the bus to reach on time.', verb: 'travel', answer: 'are travelling', hint: '"Now" = present continuous' },
  { id: 'PT-D10', type: 'fill', section: 'Present Tense', subsection: 'D. Present Continuous or Perfect Continuous', text: 'Your daughter ________ you the same thing since you got here!', verb: 'ask', answer: 'has been asking', hint: '"Since" = present perfect continuous' },
  { id: 'PT-D11', type: 'fill', section: 'Present Tense', subsection: 'D. Present Continuous or Perfect Continuous', text: 'Two little birds ________ seeds all morning.', verb: 'gather', answer: 'have been gathering', hint: '"All morning" = duration = present perfect continuous' },
  { id: 'PT-D12', type: 'fill', section: 'Present Tense', subsection: 'D. Present Continuous or Perfect Continuous', text: 'Where ________ you ________ all the marbles you collected?', verb: 'keep', answer: 'are you keeping', hint: 'Question about current action = present continuous' },
  { id: 'PT-D13', type: 'fill', section: 'Present Tense', subsection: 'D. Present Continuous or Perfect Continuous', text: 'The public health department ________ a lot of stress on sanitation in the last two months.', verb: 'put', answer: 'has been putting', hint: '"In the last two months" = duration = present perfect continuous' },
  { id: 'PT-D14', type: 'fill', section: 'Present Tense', subsection: 'D. Present Continuous or Perfect Continuous', text: 'I ________ the picture of a beautiful princess.', verb: 'paint', answer: 'am painting', hint: 'Current action = present continuous (I + am + verb-ing)' },
  { id: 'PT-D15', type: 'fill', section: 'Present Tense', subsection: 'D. Present Continuous or Perfect Continuous', text: 'How ________ he ________ after the accident?', verb: 'do', answer: 'is he doing', hint: 'Question about current state = present continuous' },

  // =====================================
  // PAST TENSE
  // =====================================

  // Section A - Fill in blanks with past tense
  { id: 'PA-A1', type: 'fill', section: 'Past Tense', subsection: 'A. Fill in the blanks', text: 'I ________ to the United States of America last year.', verb: 'go', answer: 'went', hint: 'Irregular verb: go → went → gone' },
  { id: 'PA-A2', type: 'fill', section: 'Past Tense', subsection: 'A. Fill in the blanks', text: 'The balloon ________ as she touched it.', verb: 'burst', answer: 'burst', hint: 'Irregular verb: burst → burst → burst (same form)' },
  { id: 'PA-A3', type: 'fill', section: 'Past Tense', subsection: 'A. Fill in the blanks', text: 'He ________ me some soup when I was sick.', verb: 'bring', answer: 'brought', hint: 'Irregular verb: bring → brought → brought' },
  { id: 'PA-A4', type: 'fill', section: 'Past Tense', subsection: 'A. Fill in the blanks', text: 'My mother ________ with the auto driver who was asking for more money.', verb: 'argue', answer: 'argued', hint: 'Regular verb: argue + d = argued' },
  { id: 'PA-A5', type: 'fill', section: 'Past Tense', subsection: 'A. Fill in the blanks', text: 'We ________ around town yesterday.', verb: 'drive', answer: 'drove', hint: 'Irregular verb: drive → drove → driven' },
  { id: 'PA-A6', type: 'fill', section: 'Past Tense', subsection: 'A. Fill in the blanks', text: 'She ________ the painting we gave her in the living room.', verb: 'hang', answer: 'hung', hint: 'Irregular verb: hang → hung → hung' },
  { id: 'PA-A7', type: 'fill', section: 'Past Tense', subsection: 'A. Fill in the blanks', text: 'I asked for a snack and she ________ a piece of cake for me.', verb: 'cut', answer: 'cut', hint: 'Irregular verb: cut → cut → cut (same form)' },
  { id: 'PA-A8', type: 'fill', section: 'Past Tense', subsection: 'A. Fill in the blanks', text: 'The pickpocket ________ towards the unknown passer-by.', verb: 'creep', answer: 'crept', hint: 'Irregular verb: creep → crept → crept' },
  { id: 'PA-A9', type: 'fill', section: 'Past Tense', subsection: 'A. Fill in the blanks', text: 'Sunita ________ five laps in the pool today.', verb: 'swim', answer: 'swam', hint: 'Irregular verb: swim → swam → swum' },
  { id: 'PA-A10', type: 'fill', section: 'Past Tense', subsection: 'A. Fill in the blanks', text: 'The sweater ________ after it was washed.', verb: 'shrink', answer: 'shrank', hint: 'Irregular verb: shrink → shrank → shrunk' },

  // Section B - Rewrite in given tense
  { id: 'PA-B1', type: 'rewrite', section: 'Past Tense', subsection: 'B. Rewrite in given tense', text: 'The scientists were conducting an experiment.', targetTense: 'simple past', answer: 'The scientists conducted an experiment.', hint: 'Simple past: subject + past form of verb' },
  { id: 'PA-B2', type: 'rewrite', section: 'Past Tense', subsection: 'B. Rewrite in given tense', text: 'She tried to fix the toy for her son.', targetTense: 'past continuous', answer: 'She was trying to fix the toy for her son.', hint: 'Past continuous: was/were + verb-ing' },
  { id: 'PA-B3', type: 'rewrite', section: 'Past Tense', subsection: 'B. Rewrite in given tense', text: 'The teachers worked hard to make a time table suitable for everyone.', targetTense: 'past perfect', answer: 'The teachers had worked hard to make a time table suitable for everyone.', hint: 'Past perfect: had + past participle' },
  { id: 'PA-B4', type: 'rewrite', section: 'Past Tense', subsection: 'B. Rewrite in given tense', text: 'She had burnt herself while lighting the candles.', targetTense: 'simple past', answer: 'She burnt herself while lighting the candles.', hint: 'Simple past: subject + past form of verb' },
  { id: 'PA-B5', type: 'rewrite', section: 'Past Tense', subsection: 'B. Rewrite in given tense', text: 'Yani was working all night to finish her project.', targetTense: 'past perfect continuous', answer: 'Yani had been working all night to finish her project.', hint: 'Past perfect continuous: had been + verb-ing' },
  { id: 'PA-B6', type: 'rewrite', section: 'Past Tense', subsection: 'B. Rewrite in given tense', text: 'Many students were feeling anxious before their exams.', targetTense: 'past perfect', answer: 'Many students had felt anxious before their exams.', hint: 'Past perfect: had + past participle' },
  { id: 'PA-B7', type: 'rewrite', section: 'Past Tense', subsection: 'B. Rewrite in given tense', text: 'Kevin called his father while boarding the plane.', targetTense: 'past continuous', answer: 'Kevin was calling his father while boarding the plane.', hint: 'Past continuous: was/were + verb-ing' },
  { id: 'PA-B8', type: 'rewrite', section: 'Past Tense', subsection: 'B. Rewrite in given tense', text: 'I was eating dinner quite late last night.', targetTense: 'past perfect continuous', answer: 'I had been eating dinner quite late last night.', hint: 'Past perfect continuous: had been + verb-ing' },
  { id: 'PA-B9', type: 'rewrite', section: 'Past Tense', subsection: 'B. Rewrite in given tense', text: 'We were trying to listen to the announcement on the noisy platform.', targetTense: 'simple past', answer: 'We tried to listen to the announcement on the noisy platform.', hint: 'Simple past: subject + past form of verb' },
  { id: 'PA-B10', type: 'rewrite', section: 'Past Tense', subsection: 'B. Rewrite in given tense', text: 'I cut my finger while chopping vegetables for dinner.', targetTense: 'past perfect', answer: 'I had cut my finger while chopping vegetables for dinner.', hint: 'Past perfect: had + past participle' },

  // Section C - Simple Past or Past Continuous
  { id: 'PA-C1', type: 'fill', section: 'Past Tense', subsection: 'C. Simple Past or Past Continuous', text: 'At 9.30 last night, my sister ________ on her laptop.', verb: 'work', answer: 'was working', hint: 'Ongoing action at specific time = past continuous' },
  { id: 'PA-C2', type: 'fill', section: 'Past Tense', subsection: 'C. Simple Past or Past Continuous', text: 'I ________ to lock the front door last night.', verb: 'forget', answer: 'forgot', hint: 'Completed action = simple past' },
  { id: 'PA-C3a', type: 'fill', section: 'Past Tense', subsection: 'C. Simple Past or Past Continuous', text: 'The woman ________ when the robbers broke into her house.', verb: 'sleep', answer: 'was sleeping', hint: 'Ongoing action interrupted = past continuous' },
  { id: 'PA-C3b', type: 'fill', section: 'Past Tense', subsection: 'C. Simple Past or Past Continuous', text: 'The woman was sleeping when the robbers ________ into her house.', verb: 'break', answer: 'broke', hint: 'Interrupting action = simple past' },
  { id: 'PA-C4', type: 'fill', section: 'Past Tense', subsection: 'C. Simple Past or Past Continuous', text: 'They ________ the house all day yesterday.', verb: 'paint', answer: 'were painting', hint: '"All day" = duration = past continuous' },
  { id: 'PA-C5a', type: 'fill', section: 'Past Tense', subsection: 'C. Simple Past or Past Continuous', text: 'She ________ into the car when a cyclist knocked her down.', verb: 'get', answer: 'was getting', hint: 'Ongoing action interrupted = past continuous' },
  { id: 'PA-C5b', type: 'fill', section: 'Past Tense', subsection: 'C. Simple Past or Past Continuous', text: 'She was getting into the car when a cyclist ________ her down.', verb: 'knock', answer: 'knocked', hint: 'Interrupting action = simple past' },

  // Section D - Simple Past or Past Perfect
  { id: 'PA-D1', type: 'fill', section: 'Past Tense', subsection: 'D. Simple Past or Past Perfect', text: 'I ________ a professional singer before I became a teacher.', verb: 'be', answer: 'had been', hint: 'Action before another past action = past perfect' },
  { id: 'PA-D2', type: 'fill', section: 'Past Tense', subsection: 'D. Simple Past or Past Perfect', text: 'We ________ on the phone last night.', verb: 'speak', answer: 'spoke', hint: 'Completed past action = simple past' },
  { id: 'PA-D3', type: 'fill', section: 'Past Tense', subsection: 'D. Simple Past or Past Perfect', text: 'They ________ that they would finish the work before 4.00 p.m.', verb: 'think', answer: 'thought', hint: 'Simple past for the main past action' },
  { id: 'PA-D4', type: 'fill', section: 'Past Tense', subsection: 'D. Simple Past or Past Perfect', text: 'I ________ to the library and did my history project.', verb: 'go', answer: 'went', hint: 'Sequential past actions = simple past' },
  { id: 'PA-D5', type: 'fill', section: 'Past Tense', subsection: 'D. Simple Past or Past Perfect', text: 'Priya had met her relatives when she ________ all over Europe.', verb: 'travel', answer: 'travelled', hint: 'The later action in simple past' },
  { id: 'PA-D6', type: 'fill', section: 'Past Tense', subsection: 'D. Simple Past or Past Perfect', text: 'Many children ________ sick in December.', verb: 'fall', answer: 'fell', hint: 'Completed past action = simple past' },
  { id: 'PA-D7', type: 'fill', section: 'Past Tense', subsection: 'D. Simple Past or Past Perfect', text: 'Manish ________ through the park.', verb: 'jog', answer: 'jogged', hint: 'Completed past action = simple past' },
  { id: 'PA-D8', type: 'fill', section: 'Past Tense', subsection: 'D. Simple Past or Past Perfect', text: 'Vinita ________ through the construction site but stopped when she saw the big hole.', verb: 'walk', answer: 'was walking', hint: 'Ongoing action interrupted = past continuous' },
  { id: 'PA-D9', type: 'fill', section: 'Past Tense', subsection: 'D. Simple Past or Past Perfect', text: 'I ________ sleepy in Mathematics class.', verb: 'be', answer: 'was', hint: 'Past state = simple past (was/were)' },
  { id: 'PA-D10', type: 'fill', section: 'Past Tense', subsection: 'D. Simple Past or Past Perfect', text: 'I ________ in New York for five years before I moved to India.', verb: 'live', answer: 'had lived', hint: 'Action before another past action = past perfect' },

  // Section E - Complete the Passage
  { id: 'PA-E1', type: 'fill', section: 'Past Tense', subsection: 'E. Complete the passage', text: 'Last Saturday I ________ my classmates on a trip to Barapani.', verb: 'join', answer: 'joined', hint: 'Regular verb: join + ed' },
  { id: 'PA-E2', type: 'fill', section: 'Past Tense', subsection: 'E. Complete the passage', text: 'We ________ early in the morning.', verb: 'leave', answer: 'left', hint: 'Irregular verb: leave → left' },
  { id: 'PA-E3a', type: 'fill', section: 'Past Tense', subsection: 'E. Complete the passage', text: 'After our arrival, we quickly ________ our bags.', verb: 'unpack', answer: 'unpacked', hint: 'Regular verb: unpack + ed' },
  { id: 'PA-E3b', type: 'fill', section: 'Past Tense', subsection: 'E. Complete the passage', text: 'After our arrival, we quickly unpacked and ________ our tents.', verb: 'pitch', answer: 'pitched', hint: 'Regular verb: pitch + ed' },
  { id: 'PA-E4', type: 'fill', section: 'Past Tense', subsection: 'E. Complete the passage', text: 'Later, we ________ into the forest to gather wood.', verb: 'trek', answer: 'trekked', hint: 'Regular verb: trek + ked' },
  { id: 'PA-E5a', type: 'fill', section: 'Past Tense', subsection: 'E. Complete the passage', text: 'We ________ logs on one another.', verb: 'pile', answer: 'piled', hint: 'Regular verb: pile + d' },
  { id: 'PA-E5b', type: 'fill', section: 'Past Tense', subsection: 'E. Complete the passage', text: 'We piled logs on one another and ________ a fire.', verb: 'build', answer: 'built', hint: 'Irregular verb: build → built' },
  { id: 'PA-E6', type: 'fill', section: 'Past Tense', subsection: 'E. Complete the passage', text: 'Virat and Simran ________ the afternoon fishing.', verb: 'spend', answer: 'spent', hint: 'Irregular verb: spend → spent' },
  { id: 'PA-E7', type: 'fill', section: 'Past Tense', subsection: 'E. Complete the passage', text: 'They ________ lucky!', verb: 'be', answer: 'were', hint: 'They + were' },
  { id: 'PA-E8', type: 'fill', section: 'Past Tense', subsection: 'E. Complete the passage', text: 'They ________ four large fish.', verb: 'catch', answer: 'caught', hint: 'Irregular verb: catch → caught' },
  { id: 'PA-E9', type: 'fill', section: 'Past Tense', subsection: 'E. Complete the passage', text: 'Mr Biswas, our teacher-in-charge, ________ the fish.', verb: 'cook', answer: 'cooked', hint: 'Regular verb: cook + ed' },

  // =====================================
  // FUTURE TENSE
  // =====================================

  // Section A - Fill in with correct options
  { id: 'FT-A1', type: 'choice', section: 'Future Tense', subsection: 'A. Choose the correct option', text: 'Tomorrow, Iris ________ all day.', verb: 'sleep', options: ['will be sleeping', 'will sleep'], answer: 'will be sleeping', hint: 'Ongoing action at a future time = future continuous' },
  { id: 'FT-A2', type: 'choice', section: 'Future Tense', subsection: 'A. Choose the correct option', text: 'By the time we get there, Rohan ________.', verb: 'leave', options: ['will leave', 'will have left'], answer: 'will have left', hint: 'Completed before another future event = future perfect' },
  { id: 'FT-A3', type: 'choice', section: 'Future Tense', subsection: 'A. Choose the correct option', text: 'He ________ them tomorrow at 8 p.m. for dinner.', verb: 'meet', options: ['will be meeting', 'will meet'], answer: 'will be meeting', hint: 'Action in progress at specific future time = future continuous' },
  { id: 'FT-A4', type: 'choice', section: 'Future Tense', subsection: 'A. Choose the correct option', text: 'After I finish this essay, I ________ all of my holiday homework.', verb: 'finish', options: ['will be finishing', 'will have finished'], answer: 'will have finished', hint: 'Completed before another event = future perfect' },
  { id: 'FT-A5', type: 'choice', section: 'Future Tense', subsection: 'A. Choose the correct option', text: "Don't visit me in the afternoon. I ________ clothes.", verb: 'wash', options: ['will have been washing', 'will be washing'], answer: 'will be washing', hint: 'Ongoing at that time = future continuous' },
  { id: 'FT-A6', type: 'choice', section: 'Future Tense', subsection: 'A. Choose the correct option', text: 'This time next month, I ________ on the beach.', verb: 'play', options: ['will be playing', 'will have been playing'], answer: 'will be playing', hint: 'Action in progress at future time = future continuous' },
  { id: 'FT-A7', type: 'choice', section: 'Future Tense', subsection: 'A. Choose the correct option', text: "He doesn't understand what he did wrong, but he ________.", verb: 'find out', options: ['will find out', 'will have found out'], answer: 'will find out', hint: 'Simple future prediction' },
  { id: 'FT-A8', type: 'choice', section: 'Future Tense', subsection: 'A. Choose the correct option', text: 'My sister refused to help! I ________ her for anything again.', verb: 'ask', options: ['will never be asking', 'will never ask'], answer: 'will never ask', hint: 'Decision/resolution = simple future' },
  { id: 'FT-A9', type: 'choice', section: 'Future Tense', subsection: 'A. Choose the correct option', text: 'If he keeps on eating like this, he ________ all the food in a day.', verb: 'finish', options: ['will finish', 'will have finished'], answer: 'will have finished', hint: 'Completed by end of period = future perfect' },
  { id: 'FT-A10', type: 'choice', section: 'Future Tense', subsection: 'A. Choose the correct option', text: 'By 2021, I ________ in this company for five years.', verb: 'work', options: ['will have been working', 'will work'], answer: 'will have been working', hint: 'Duration up to future point = future perfect continuous' },

  // Section B - Fill in with given verbs
  { id: 'FT-B1', type: 'fill', section: 'Future Tense', subsection: 'B. Fill in the blanks', text: 'The flight ________ at 4.20 a.m.', verb: 'leave', answer: 'will leave', hint: 'Scheduled event = simple future' },
  { id: 'FT-B2', type: 'fill', section: 'Future Tense', subsection: 'B. Fill in the blanks', text: 'We ________ the cake from the new bakery on Church Street.', verb: 'buy (going to)', answer: 'are going to buy', hint: 'Planned action = going to' },
  { id: 'FT-B3', type: 'fill', section: 'Future Tense', subsection: 'B. Fill in the blanks', text: 'My grandmother believes it ________ tomorrow.', verb: 'rain', answer: 'will rain', hint: 'Prediction = will + verb' },
  { id: 'FT-B4', type: 'fill', section: 'Future Tense', subsection: 'B. Fill in the blanks', text: 'By next year, I ________ at this club for 10 years.', verb: 'play', answer: 'will have been playing', hint: 'Duration up to future point = future perfect continuous' },
  { id: 'FT-B5', type: 'fill', section: 'Future Tense', subsection: 'B. Fill in the blanks', text: 'By the time you see this, I ________ England.', verb: 'reach', answer: 'will have reached', hint: 'Completed before future event = future perfect' },
  { id: 'FT-B6', type: 'fill', section: 'Future Tense', subsection: 'B. Fill in the blanks', text: 'I ________ my best friend in the summer.', verb: 'see (going to)', answer: 'am going to see', hint: 'Planned action = going to' },
  { id: 'FT-B7', type: 'fill', section: 'Future Tense', subsection: 'B. Fill in the blanks', text: 'I ________ with you to the airport.', verb: 'come', answer: 'will come', hint: 'Spontaneous decision/offer = will' },
  { id: 'FT-B8', type: 'fill', section: 'Future Tense', subsection: 'B. Fill in the blanks', text: 'In June next year, you ________ for three years.', verb: 'drive', answer: 'will have been driving', hint: 'Duration up to future point = future perfect continuous' },
  { id: 'FT-B9', type: 'fill', section: 'Future Tense', subsection: 'B. Fill in the blanks', text: "You ________ Tamanna at school tomorrow, won't you?", verb: 'meet', answer: 'will be meeting', hint: 'Action in progress at future time = future continuous' },
  { id: 'FT-B10', type: 'fill', section: 'Future Tense', subsection: 'B. Fill in the blanks', text: '________ out for dinner tonight?', verb: 'go (shall we)', answer: 'Shall we go', hint: 'Suggestion/offer = Shall we + verb' },

  // Section C - Change from simple past to future tense
  { id: 'FT-C1', type: 'rewrite', section: 'Future Tense', subsection: 'C. Change to future tense', text: 'I travelled to Myanmar to meet an old friend.', targetTense: 'future tense', answer: 'I will travel to Myanmar to meet an old friend.', hint: 'Change past verb to will + base form' },
  { id: 'FT-C2', type: 'rewrite', section: 'Future Tense', subsection: 'C. Change to future tense', text: 'She disguised herself as a beggar and walked towards her sister.', targetTense: 'future tense', answer: 'She will disguise herself as a beggar and walk towards her sister.', hint: 'Change past verbs to will + base form' },
  { id: 'FT-C3', type: 'rewrite', section: 'Future Tense', subsection: 'C. Change to future tense', text: 'After asking a passer-by for direction, we found our way to the campsite.', targetTense: 'future tense', answer: 'After asking a passer-by for direction, we will find our way to the campsite.', hint: 'Change past verb to will + base form' },
  { id: 'FT-C4', type: 'rewrite', section: 'Future Tense', subsection: 'C. Change to future tense', text: 'He took off his hat, bowed and greeted her.', targetTense: 'future tense', answer: 'He will take off his hat, bow and greet her.', hint: 'Change past verbs to will + base form' },
  { id: 'FT-C5', type: 'rewrite', section: 'Future Tense', subsection: 'C. Change to future tense', text: 'We talked for over half an hour.', targetTense: 'future tense', answer: 'We will talk for over half an hour.', hint: 'Change past verb to will + base form' },
  { id: 'FT-C6', type: 'rewrite', section: 'Future Tense', subsection: 'C. Change to future tense', text: 'I showed her my coin collection.', targetTense: 'future tense', answer: 'I will show her my coin collection.', hint: 'Change past verb to will + base form' },
  { id: 'FT-C7', type: 'rewrite', section: 'Future Tense', subsection: 'C. Change to future tense', text: 'We exchanged phone numbers and promised to keep in touch.', targetTense: 'future tense', answer: 'We will exchange phone numbers and promise to keep in touch.', hint: 'Change past verbs to will + base form' },
  { id: 'FT-C8', type: 'rewrite', section: 'Future Tense', subsection: 'C. Change to future tense', text: 'I took the coat from him and walked towards the door.', targetTense: 'future tense', answer: 'I will take the coat from him and walk towards the door.', hint: 'Change past verbs to will + base form' },
  { id: 'FT-C9', type: 'rewrite', section: 'Future Tense', subsection: 'C. Change to future tense', text: 'They were fluent French speakers by the end of the month.', targetTense: 'future tense', answer: 'They will be fluent French speakers by the end of the month.', hint: 'Change were to will be' },
  { id: 'FT-C10', type: 'rewrite', section: 'Future Tense', subsection: 'C. Change to future tense', text: 'We put our books and other things on the table.', targetTense: 'future tense', answer: 'We will put our books and other things on the table.', hint: 'Change past verb to will + base form' },

  // Section D - Rewrite in future tense
  { id: 'FT-D1', type: 'rewrite', section: 'Future Tense', subsection: 'D. Rewrite in future tense', text: 'Vinod and Vineeth clean their rooms before dinner.', targetTense: 'future tense', answer: 'Vinod and Vineeth will clean their rooms before dinner.', hint: 'Add will before base verb' },
  { id: 'FT-D2', type: 'rewrite', section: 'Future Tense', subsection: 'D. Rewrite in future tense', text: 'The little children fed the horses and the cattle at the farm.', targetTense: 'future tense', answer: 'The little children will feed the horses and the cattle at the farm.', hint: 'Change fed to will feed' },
  { id: 'FT-D3', type: 'rewrite', section: 'Future Tense', subsection: 'D. Rewrite in future tense', text: 'She was overjoyed, but her sister was miserable.', targetTense: 'future tense', answer: 'She will be overjoyed, but her sister will be miserable.', hint: 'Change was to will be' },
  { id: 'FT-D4', type: 'rewrite', section: 'Future Tense', subsection: 'D. Rewrite in future tense', text: 'They were brave while facing monsters from outer space.', targetTense: 'future tense', answer: 'They will be brave while facing monsters from outer space.', hint: 'Change were to will be' },
  { id: 'FT-D5', type: 'rewrite', section: 'Future Tense', subsection: 'D. Rewrite in future tense', text: 'She competes in the Asian Games today.', targetTense: 'future tense', answer: 'She will compete in the Asian Games.', hint: 'Add will before base verb' },
  { id: 'FT-D6', type: 'rewrite', section: 'Future Tense', subsection: 'D. Rewrite in future tense', text: 'The thieves leapt out of the car and ran into the bank.', targetTense: 'future tense', answer: 'The thieves will leap out of the car and run into the bank.', hint: 'Change past verbs to will + base form' },
  { id: 'FT-D7', type: 'rewrite', section: 'Future Tense', subsection: 'D. Rewrite in future tense', text: 'Shamita was confused when she opened the door.', targetTense: 'future tense', answer: 'Shamita will be confused when she opens the door.', hint: 'Change was to will be, opened to opens' },
  { id: 'FT-D8', type: 'rewrite', section: 'Future Tense', subsection: 'D. Rewrite in future tense', text: 'Thomas rode his cycle to the stadium and kept it there.', targetTense: 'future tense', answer: 'Thomas will ride his cycle to the stadium and keep it there.', hint: 'Change past verbs to will + base form' },
  { id: 'FT-D9', type: 'rewrite', section: 'Future Tense', subsection: 'D. Rewrite in future tense', text: 'The wind blows the newspapers away.', targetTense: 'future tense', answer: 'The wind will blow the newspapers away.', hint: 'Add will before base verb' },
  { id: 'FT-D10', type: 'rewrite', section: 'Future Tense', subsection: 'D. Rewrite in future tense', text: 'The blow to the forehead killed him instantly.', targetTense: 'future tense', answer: 'The blow to the forehead will kill him instantly.', hint: 'Change killed to will kill' },

  // Section E - Future Perfect
  { id: 'FT-E1', type: 'fill', section: 'Future Tense', subsection: 'E. Future Perfect', text: 'The doctor ________ by six in the evening.', verb: 'leave', answer: 'will have left', hint: 'Future perfect: will have + past participle' },
  { id: 'FT-E2', type: 'fill', section: 'Future Tense', subsection: 'E. Future Perfect', text: 'I ________ in this house for five years in March.', verb: 'live', answer: 'will have lived', hint: 'Future perfect: will have + past participle' },
  { id: 'FT-E3', type: 'fill', section: 'Future Tense', subsection: 'E. Future Perfect', text: 'Pratheesh ________ his project by March.', verb: 'complete', answer: 'will have completed', hint: 'Future perfect: will have + past participle' },
  { id: 'FT-E4', type: 'fill', section: 'Future Tense', subsection: 'E. Future Perfect', text: 'Mohan ________ enough to rest and heal his body by evening.', verb: 'sleep', answer: 'will have slept', hint: 'Future perfect: will have + past participle' },
  { id: 'FT-E5', type: 'fill', section: 'Future Tense', subsection: 'E. Future Perfect', text: 'I ________ all the arrangements by 7 p.m.', verb: 'do', answer: 'will have done', hint: 'Future perfect: will have + past participle (do → done)' },
  { id: 'FT-E6', type: 'fill', section: 'Future Tense', subsection: 'E. Future Perfect', text: 'By tomorrow morning, he ________ everything.', verb: 'forget', answer: 'will have forgotten', hint: 'Future perfect: will have + past participle' },
  { id: 'FT-E7', type: 'fill', section: 'Future Tense', subsection: 'E. Future Perfect', text: 'By the end of this year, Mrs Jerome ________ us for over ten years.', verb: 'teach', answer: 'will have taught', hint: 'Future perfect: will have + past participle (teach → taught)' },
  { id: 'FT-E8', type: 'fill', section: 'Future Tense', subsection: 'E. Future Perfect', text: 'By ten o\'clock, everyone ________ asleep.', verb: 'fall', answer: 'will have fallen', hint: 'Future perfect: will have + past participle (fall → fallen)' },
  { id: 'FT-E9', type: 'fill', section: 'Future Tense', subsection: 'E. Future Perfect', text: 'At 8.00 a.m. tomorrow morning, they ________ working.', verb: 'begin', answer: 'will have begun', hint: 'Future perfect: will have + past participle (begin → begun)' },
  { id: 'FT-E10', type: 'fill', section: 'Future Tense', subsection: 'E. Future Perfect', text: 'My brother and I ________ our rooms by dinner.', verb: 'clean', answer: 'will have cleaned', hint: 'Future perfect: will have + past participle' },
];

// Audio Context for synthesized sounds
const useAudio = () => {
  const audioContextRef = useRef(null);
  
  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);
  
  const playCorrect = useCallback(() => {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, now + i * 0.08);
      gain.gain.linearRampToValueAtTime(0.3, now + i * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.08 + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.4);
    });
  }, [getAudioContext]);
  
  const playIncorrect = useCallback(() => {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.3);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.35);
  }, [getAudioContext]);
  
  const playStreak = useCallback(() => {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const notes = [392, 493.88, 587.33, 783.99];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, now + i * 0.1);
      gain.gain.linearRampToValueAtTime(0.15, now + i * 0.1 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.1);
      osc.stop(now + i * 0.1 + 0.6);
    });
  }, [getAudioContext]);
  
  const playLevelUp = useCallback(() => {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    [261.63, 329.63, 392, 523.25, 659.25, 783.99].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = i < 3 ? 'triangle' : 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, now + i * 0.12);
      gain.gain.linearRampToValueAtTime(0.25, now + i * 0.12 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.12 + 0.8);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.12);
      osc.stop(now + i * 0.12 + 1);
    });
  }, [getAudioContext]);
  
  const playClick = useCallback(() => {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = 800;
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.06);
  }, [getAudioContext]);
  
  const playPerfect = useCallback(() => {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const notes = [523.25, 783.99, 1046.50, 1318.51, 1567.98];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, now + i * 0.15);
      gain.gain.linearRampToValueAtTime(0.2, now + i * 0.15 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.15 + 0.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.15);
      osc.stop(now + i * 0.15 + 0.8);
    });
  }, [getAudioContext]);
  
  return { playCorrect, playIncorrect, playStreak, playLevelUp, playClick, playPerfect };
};

const getLevel = (xp) => Math.floor(xp / 100) + 1;
const getXPProgress = (xp) => xp % 100;

const getSectionIcon = (section) => {
  switch(section) {
    case 'Past Tense': return '⏮️';
    case 'Present Tense': return '⏺️';
    case 'Future Tense': return '⏭️';
    default: return '📚';
  }
};

const getSectionColor = (section) => {
  switch(section) {
    case 'Past Tense': return 'from-amber-500 to-orange-600';
    case 'Present Tense': return 'from-emerald-500 to-teal-600';
    case 'Future Tense': return 'from-violet-500 to-purple-600';
    default: return 'from-purple-500 to-pink-500';
  }
};

const getTypeIcon = (type) => {
  switch(type) {
    case 'fill': return '✏️';
    case 'choice': return '🔘';
    case 'rewrite': return '🔄';
    case 'error': return '🔧';
    default: return '📝';
  }
};

const getTypeLabel = (type) => {
  switch(type) {
    case 'fill': return 'Fill in the blank';
    case 'choice': return 'Choose correct option';
    case 'rewrite': return 'Rewrite sentence';
    case 'error': return 'Correct the error';
    default: return 'Answer';
  }
};

function TenseQuest() {
  const [gameState, setGameState] = useState('menu');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [xp, setXP] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [showResult, setShowResult] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [previousLevel, setPreviousLevel] = useState(1);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [selectedSection, setSelectedSection] = useState('all');
  const [totalXPEarned, setTotalXPEarned] = useState(0);
  const [questionLimit, setQuestionLimit] = useState(20);
  
  const { playCorrect, playIncorrect, playStreak, playLevelUp, playClick, playPerfect } = useAudio();
  const inputRef = useRef(null);
  
  const sections = ['all', 'Present Tense', 'Past Tense', 'Future Tense'];
  
  const getSectionCount = (section) => {
    if (section === 'all') return questions.length;
    return questions.filter(q => q.section === section).length;
  };
  
  const startGame = () => {
    playClick();
    let filteredQuestions = selectedSection === 'all' 
      ? [...questions] 
      : questions.filter(q => q.section === selectedSection);
    
    for (let i = filteredQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filteredQuestions[i], filteredQuestions[j]] = [filteredQuestions[j], filteredQuestions[i]];
    }
    
    const limit = questionLimit === 'all' ? filteredQuestions.length : Math.min(questionLimit, filteredQuestions.length);
    filteredQuestions = filteredQuestions.slice(0, limit);
    
    setShuffledQuestions(filteredQuestions);
    setCurrentIndex(0);
    setAnswers([]);
    setShowResult(null);
    setGameState('playing');
    setShowHint(false);
    setTotalXPEarned(0);
    setStreak(0);
  };
  
  const normalizeAnswer = (str) => {
    return str.toLowerCase().trim().replace(/\s+/g, ' ').replace(/['']/g, "'");
  };
  
  const checkAnswer = (answer) => {
    const question = shuffledQuestions[currentIndex];
    const normalizedUserAnswer = normalizeAnswer(answer);
    const normalizedCorrectAnswer = normalizeAnswer(question.answer);
    const isCorrect = normalizedUserAnswer === normalizedCorrectAnswer;
    
    setShowResult(isCorrect ? 'correct' : 'incorrect');
    setAnswers([...answers, { question, userAnswer: answer, isCorrect }]);
    
    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
      
      const baseXP = 10;
      const streakBonus = Math.min(newStreak * 2, 20);
      const earnedXP = baseXP + streakBonus;
      const newXP = xp + earnedXP;
      setTotalXPEarned(prev => prev + earnedXP);
      
      const newLevel = getLevel(newXP);
      if (newLevel > previousLevel) {
        setPreviousLevel(newLevel);
        setShowLevelUp(true);
        playLevelUp();
        setTimeout(() => setShowLevelUp(false), 2000);
      } else if (newStreak > 0 && newStreak % 5 === 0) {
        playStreak();
      } else {
        playCorrect();
      }
      
      setXP(newXP);
    } else {
      setStreak(0);
      playIncorrect();
    }
  };
  
  const handleSubmit = (e) => {
    e?.preventDefault();
    if (userAnswer.trim() && !showResult) {
      checkAnswer(userAnswer);
    }
  };
  
  const handleChoice = (choice) => {
    if (!showResult) {
      setUserAnswer(choice);
      checkAnswer(choice);
    }
  };
  
  const nextQuestion = () => {
    playClick();
    if (currentIndex < shuffledQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserAnswer('');
      setShowResult(null);
      setShowHint(false);
    } else {
      const correct = answers.filter(a => a.isCorrect).length + (showResult === 'correct' ? 1 : 0);
      const total = shuffledQuestions.length;
      if (correct === total) {
        playPerfect();
      }
      setGameState('results');
    }
  };
  
  useEffect(() => {
    if (gameState === 'playing' && inputRef.current && !showResult) {
      inputRef.current.focus();
    }
  }, [currentIndex, gameState, showResult]);
  
  const level = getLevel(xp);
  const xpProgress = getXPProgress(xp);
  const currentQuestion = shuffledQuestions[currentIndex];
  
  // Menu Screen
  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 max-w-md w-full text-center border border-white/20 shadow-2xl">
          <div className="text-5xl mb-3">⚔️</div>
          <h1 className="text-3xl font-bold text-white mb-1">Tense Quest</h1>
          <p className="text-purple-200 mb-4 text-sm">Master All Three Tenses!</p>
          
          <div className="bg-white/5 rounded-xl p-3 mb-4">
            <div className="flex items-center justify-between text-white mb-2">
              <span className="text-yellow-400 text-sm">⭐ Level {level}</span>
              <span className="text-purple-300 text-sm">{xp} XP Total</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
          </div>
          
          <div className="mb-4 space-y-2">
            <label className="text-white text-sm block mb-2 font-medium">Choose Your Quest:</label>
            {sections.map(s => (
              <button
                key={s}
                onClick={() => { playClick(); setSelectedSection(s); }}
                className={`w-full p-3 rounded-xl text-left transition-all flex items-center justify-between ${
                  selectedSection === s 
                    ? `bg-gradient-to-r ${s === 'all' ? 'from-purple-500 to-pink-500' : getSectionColor(s)} text-white shadow-lg scale-[1.02]` 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-xl">{s === 'all' ? '🎯' : getSectionIcon(s)}</span>
                  <span className="font-medium text-sm">{s === 'all' ? 'All Tenses' : s}</span>
                </span>
                <span className="text-xs opacity-75">{getSectionCount(s)} Qs</span>
              </button>
            ))}
          </div>
          
          <div className="mb-4">
            <label className="text-white text-sm block mb-2">Questions per session:</label>
            <div className="flex gap-2 justify-center flex-wrap">
              {[10, 20, 30, 50, 'all'].map(n => (
                <button
                  key={n}
                  onClick={() => { playClick(); setQuestionLimit(n); }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    questionLimit === n 
                      ? 'bg-purple-500 text-white' 
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {n === 'all' ? 'All' : n}
                </button>
              ))}
            </div>
          </div>
          
          <button
            onClick={startGame}
            className="w-full bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-bold py-3 px-6 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            🚀 Start Quest
          </button>
          
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            <div className="bg-white/5 rounded-lg p-2">
              <span className="text-orange-400">🔥</span>
              <p className="text-purple-200">Streaks = Bonus XP</p>
            </div>
            <div className="bg-white/5 rounded-lg p-2">
              <span className="text-yellow-400">💡</span>
              <p className="text-purple-200">Use hints if stuck</p>
            </div>
          </div>
          
          <p className="text-purple-300 text-xs mt-3">Total: {questions.length} questions</p>
        </div>
      </div>
    );
  }
  
  // Results Screen
  if (gameState === 'results') {
    const correct = answers.filter(a => a.isCorrect).length;
    const total = answers.length;
    const percentage = Math.round((correct / total) * 100);
    const isPerfect = percentage === 100;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 max-w-lg w-full text-center border border-white/20 shadow-2xl max-h-[90vh] overflow-y-auto">
          <div className="text-5xl mb-3">
            {isPerfect ? '👑' : percentage >= 80 ? '🏆' : percentage >= 60 ? '⭐' : '📚'}
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">
            {isPerfect ? 'PERFECT!' : 'Quest Complete!'}
          </h2>
          {isPerfect && (
            <p className="text-yellow-400 mb-3 animate-pulse text-sm">✨ Flawless Victory! ✨</p>
          )}
          
          <div className="grid grid-cols-4 gap-2 mb-4">
            <div className="bg-white/10 rounded-xl p-2">
              <div className="text-xl font-bold text-green-400">{correct}</div>
              <div className="text-purple-300 text-xs">Correct</div>
            </div>
            <div className="bg-white/10 rounded-xl p-2">
              <div className="text-xl font-bold text-red-400">{total - correct}</div>
              <div className="text-purple-300 text-xs">Wrong</div>
            </div>
            <div className="bg-white/10 rounded-xl p-2">
              <div className="text-xl font-bold text-white">{percentage}%</div>
              <div className="text-purple-300 text-xs">Score</div>
            </div>
            <div className="bg-white/10 rounded-xl p-2">
              <div className="text-xl font-bold text-orange-400">{maxStreak}</div>
              <div className="text-purple-300 text-xs">Streak</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl p-3 mb-4">
            <p className="text-yellow-400 font-bold">+{totalXPEarned} XP Earned!</p>
            <p className="text-purple-300 text-xs">Total: {xp} XP • Level {level}</p>
          </div>
          
          <div className="bg-white/5 rounded-xl p-3 mb-4 max-h-60 overflow-y-auto text-left">
            <h3 className="text-white font-semibold mb-2 text-center text-sm">📝 Review Answers:</h3>
            {answers.map((a, i) => (
              <div key={i} className={`p-2 rounded-lg mb-2 text-xs ${a.isCorrect ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'}`}>
                <div className="flex items-start gap-2">
                  <span>{a.isCorrect ? '✅' : '❌'}</span>
                  <div className="flex-1">
                    <p className="text-white">{a.question.text}</p>
                    {a.question.targetTense && (
                      <p className="text-purple-300 italic">({a.question.targetTense})</p>
                    )}
                    <p className="mt-1">
                      <span className={a.isCorrect ? 'text-green-400' : 'text-red-400'}>
                        Your: {a.userAnswer}
                      </span>
                      {!a.isCorrect && (
                        <span className="text-green-400 ml-2">✓ {a.question.answer}</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => { playClick(); startGame(); }}
              className="flex-1 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-bold py-3 px-4 rounded-xl transition-all transform hover:scale-105"
            >
              🔄 Retry
            </button>
            <button
              onClick={() => { playClick(); setGameState('menu'); }}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-4 rounded-xl transition-all transform hover:scale-105"
            >
              🏠 Menu
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // Game Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-3">
      {showLevelUp && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="text-center">
            <div className="text-5xl font-bold text-yellow-400 animate-bounce drop-shadow-lg">
              🎉 LEVEL {level}! 🎉
            </div>
          </div>
        </div>
      )}
      
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-3">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <div className="bg-white/10 rounded-lg px-2 py-1">
              <span className="text-yellow-400 text-xs">⭐ Lv.{level}</span>
            </div>
            <div className="bg-white/10 rounded-lg px-2 py-1">
              <span className="text-orange-400 text-xs">🔥 {streak}</span>
            </div>
            {streak >= 3 && (
              <div className="bg-orange-500/30 rounded-lg px-2 py-1 animate-pulse">
                <span className="text-orange-300 text-xs">+{Math.min(streak * 2, 20)}</span>
              </div>
            )}
          </div>
          <div className="bg-white/10 rounded-lg px-2 py-1">
            <span className="text-purple-300 text-xs">{currentIndex + 1}/{shuffledQuestions.length}</span>
          </div>
        </div>
        <div className="mt-2 h-1.5 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500"
            style={{ width: `${xpProgress}%` }}
          />
        </div>
      </div>
      
      {/* Question Card */}
      <div className="max-w-2xl mx-auto">
        <div className={`bg-white/10 backdrop-blur-lg rounded-2xl p-4 border transition-all duration-300 ${
          showResult === 'correct' ? 'border-green-400 shadow-green-400/30 shadow-lg' :
          showResult === 'incorrect' ? 'border-red-400 shadow-red-400/30 shadow-lg' :
          'border-white/20'
        }`}>
          
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={`bg-gradient-to-r ${getSectionColor(currentQuestion.section)} text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
              {getSectionIcon(currentQuestion.section)} {currentQuestion.section}
            </span>
            <span className="bg-white/10 text-purple-200 px-2 py-1 rounded-full text-xs">
              {getTypeIcon(currentQuestion.type)} {getTypeLabel(currentQuestion.type)}
            </span>
          </div>
          
          {/* Subsection */}
          {currentQuestion.subsection && (
            <p className="text-purple-300 text-xs mb-2">{currentQuestion.subsection}</p>
          )}
          
          {/* Question Text */}
          <div className="text-white text-lg mb-4 leading-relaxed">
            {currentQuestion.type === 'rewrite' || currentQuestion.type === 'error' ? (
              <div>
                <p className="mb-2">{currentQuestion.text}</p>
                {currentQuestion.targetTense && (
                  <p className="text-purple-300 text-sm italic">→ Convert to: {currentQuestion.targetTense}</p>
                )}
                {currentQuestion.type === 'error' && (
                  <p className="text-purple-300 text-sm italic">→ Find and correct the error</p>
                )}
              </div>
            ) : (
              <>
                {currentQuestion.text.split('________').map((part, i, arr) => (
                  <React.Fragment key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <span className={`inline-block min-w-[80px] border-b-2 mx-1 px-1 ${
                        showResult === 'correct' ? 'border-green-400 text-green-400 bg-green-400/10' :
                        showResult === 'incorrect' ? 'border-red-400 text-red-400 bg-red-400/10' :
                        'border-purple-400'
                      }`}>
                        {showResult && <span>{userAnswer}</span>}
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </>
            )}
          </div>
          
          {/* Verb hint */}
          {currentQuestion.verb && currentQuestion.type === 'fill' && (
            <div className="bg-white/5 rounded-lg p-2 mb-3 inline-block">
              <span className="text-purple-300 text-sm">Verb: </span>
              <span className="text-white font-bold">{currentQuestion.verb}</span>
            </div>
          )}
          
          {/* Answer Input */}
          {currentQuestion.type === 'choice' ? (
            <div className="grid grid-cols-1 gap-2 mb-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleChoice(option)}
                  disabled={showResult !== null}
                  className={`p-3 rounded-xl text-left font-medium transition-all border-2 ${
                    showResult && option === currentQuestion.answer
                      ? 'bg-green-500/30 border-green-400 text-white'
                      : showResult && option === userAnswer && option !== currentQuestion.answer
                      ? 'bg-red-500/30 border-red-400 text-white'
                      : showResult 
                      ? 'bg-white/5 border-white/10 text-white/50'
                      : 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-purple-400'
                  }`}
                >
                  <span className="flex items-center justify-between">
                    {option}
                    {showResult && option === currentQuestion.answer && <span>✓</span>}
                    {showResult && option === userAnswer && option !== currentQuestion.answer && <span>✗</span>}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="mb-3">
              <input
                ref={inputRef}
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                disabled={showResult !== null}
                placeholder={
                  currentQuestion.type === 'rewrite' || currentQuestion.type === 'error'
                    ? "Type the complete corrected sentence..."
                    : "Type your answer..."
                }
                className="w-full rounded-xl p-3 border text-base
                  bg-white text-gray-900 border-purple-300
                  placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400
                  disabled:bg-gray-100 disabled:text-gray-500 disabled:placeholder-gray-400 disabled:cursor-not-allowed"
                autoComplete="off"
                autoCapitalize="off"
              />
              {!showResult && (
                <button
                  onClick={handleSubmit}
                  disabled={!userAnswer.trim()}
                  className="mt-2 w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2.5 px-4 rounded-xl transition-all"
                >
                  Check Answer ↵
                </button>
              )}
            </div>
          )}
          
          {/* Hint */}
          {!showResult && (
            <button
              onClick={() => { playClick(); setShowHint(!showHint); }}
              className="text-purple-300 hover:text-purple-100 text-sm underline transition-colors"
            >
              {showHint ? '🙈 Hide Hint' : '💡 Need a hint?'}
            </button>
          )}
          
          {showHint && !showResult && (
            <div className="mt-2 bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-2 text-yellow-200 text-sm flex items-start gap-2">
              <span>💡</span>
              <span>{currentQuestion.hint}</span>
            </div>
          )}
          
          {/* Result Feedback */}
          {showResult && (
            <div className={`mt-3 p-3 rounded-xl ${
              showResult === 'correct' 
                ? 'bg-green-500/20 border border-green-500/30' 
                : 'bg-red-500/20 border border-red-500/30'
            }`}>
              <div className="flex items-start gap-3">
                <span className="text-3xl">{showResult === 'correct' ? '🎉' : '💪'}</span>
                <div className="flex-1">
                  <p className={`font-bold ${showResult === 'correct' ? 'text-green-400' : 'text-red-400'}`}>
                    {showResult === 'correct' 
                      ? ['Excellent!', 'Amazing!', 'Perfect!', 'Great!', 'Brilliant!'][Math.floor(Math.random() * 5)]
                      : ['Not quite!', 'Almost!', 'Keep trying!'][Math.floor(Math.random() * 3)]
                    }
                  </p>
                  {showResult === 'incorrect' && (
                    <div className="text-white mt-1 text-sm">
                      <p>Correct answer:</p>
                      <p className="text-green-400 font-medium">{currentQuestion.answer}</p>
                    </div>
                  )}
                  {showResult === 'correct' && (
                    <p className="text-green-300 text-sm">+{10 + Math.min(streak * 2, 20)} XP!</p>
                  )}
                  <p className="text-purple-300 text-xs mt-1 italic">💡 {currentQuestion.hint}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Next Button */}
          {showResult && (
            <button
              onClick={nextQuestion}
              className="mt-3 w-full bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-bold py-3 px-6 rounded-xl text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              {currentIndex < shuffledQuestions.length - 1 ? (
                <>Next → </>
              ) : (
                <>🏁 Results</>
              )}
            </button>
          )}
        </div>
        
        {/* Progress */}
        <div className="mt-3">
          <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-500"
              style={{ width: `${((currentIndex + (showResult ? 1 : 0)) / shuffledQuestions.length) * 100}%` }}
            />
          </div>
        </div>
        
        <button
          onClick={() => { playClick(); setGameState('menu'); }}
          className="mt-3 text-purple-300 hover:text-white text-sm underline transition-colors"
        >
          ← Exit to Menu
        </button>
      </div>
    </div>
  );
}

// Mount the app
const rootElement = document.getElementById('root');
if (rootElement && ReactDOM) {
  if (ReactDOM.createRoot) {
    ReactDOM.createRoot(rootElement).render(<TenseQuest />);
  } else if (ReactDOM.render) {
    ReactDOM.render(<TenseQuest />, rootElement);
  }
}
