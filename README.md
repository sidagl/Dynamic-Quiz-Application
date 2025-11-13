# Frugal Quiz — Dynamic Quiz Application  
### Software Engineer (SE) Assignment — Frugal Testing  
Made by: Siddharth Agarwal  

---

## Project Overview
This project is a **dynamic client-side quiz application** built using **HTML, CSS, and JavaScript**.  
It includes advanced UI features and a fully automated **Selenium WebDriver test script**.

<a href="https://example.com](https://sidagl.github.io/Dynamic-Quiz-Application/" ></a>

### Features Included
- Dynamic question loading  
- **Per-question timer**  
- **Progress bar**  
- **Question & option shuffling**  
- **Animations for transitions**  
- **Light/Dark theme toggle (saved in localStorage)**  
- Detailed result breakdown  
- Time spent per question  
- Score calculation  
- Result visualization using **Chart.js**  
- **Loading splash screen**  

### Selenium Automation
A complete Selenium script (`automate_quiz.py`) automates:
- Launching the quiz
- Clicking "Start Quiz"
- Navigating questions
- Selecting answers
- Submitting the quiz
- Capturing screenshots
- Logging execution steps

---

## Project Structure

```
frugal-quiz/
│  index.html
│  README.md
│
├─ css/
│   └─ styles.css
│
├─ js/
│   ├─ questions.js
│   └─ script.js
│
└─ automation/
    ├─ automate_quiz.py
    └─ screenshots/
        ├─ landing.png
        ├─ question1.png
        ├─ result.png
        └─ automation_log.txt
```

---
