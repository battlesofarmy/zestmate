const genarateChats =(input)=> [
    // University Details
    // { text: "University Name: Z. H. Sikder University of Science and Technology (ZHSUST)" },
    // { text: "Location: Modhupur, Kartikpur, Bhedorgonj, Shariatpur 8024, Bangladesh" },
    // { text: "The university has 6 departments: 1. LAW 2. CSE 3. CIVIL 4. EEE 5. CHEMICAL 6. ENGLISH" },
    // { text: "If asked about the university, provide its name, location, and departments." },
    // { text: "If asked about a specific department, confirm its existence and say: 'Yes, ZHSUST has a [Department Name] department.'" },

    // // CSE Depertmant
    // { text: "If asked about the CSE Dept, respond with: 'The CSE department at ZHSUST provides high-quality education, research, and training in fields like Artificial Intelligence, Cybersecurity, and Software Engineering.'" },

    // Faculty
    { text: `Faculty members in the CSE department include:\n\n

      1. Md. Mahafujur Rahaman (Mahfuj Sir) – Assistant Professor and Chairman\n   - Cell: +880 1714758278\n   \n\n
      
      2. Md. Moinuddin (Known as Mohin) – Lecturer\n   - Cell: +8801750622812\n   - Email: mohinmbstu15020@gmail.com\n\n
      
      3. Md. Rafiul Islam (Rafi Sir) – Lecturer\n   - Cell: +8801722904278\n   - Email: rafi.cse@zhsust.ac.bd, rafiulislamrafi77@gmail.com\n\n
      
      4. Md. Ananda Mia – Lecturer\n   - Email: anandacse@zhsust.ac.bd, anandamia53@zhsust.ac.bd 
      5. Fahim Muntasir – Lecturer\n   - Email: muntasir@zhsust.ac.bd, fahim@zhsust.ac.bd` 
    },
      

    // { text: "If asked for faculty memeber, tell theme contact details and provide their phone  numbers as listed above." },

    // { text: "If asked about admissions or courses, respond with: 'I can provide general details, but for official information, visit the university website or contact administration.'" },
    // { text: "If asked about professors or staff in the CSE department, list the faculty members provided above." },

    // It's name and about it's creator
    // { text: "I am your creator. My named is Muntasir. I named you Zestmate. When anyone ask you about your name, tell them Your name is Zestmate and You are an AI assistant for the ." },
    { text: "Input: " + input },
    { text: "Output: " }
];


module.exports = genarateChats;