# Dynamic-Quiz-Application
# Frugal Quiz — Dynamic Quiz Application  
### Software Engineer (SE) Assignment — Frugal Testing  
Author: *Your Name*  

---

## 📌 Project Overview
This project is a **dynamic client-side quiz application** built using **HTML, CSS, and JavaScript**.  
It includes advanced UI features and a fully automated **Selenium WebDriver test script**.

### ✔ Features Included
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

### ✔ Selenium Automation
A complete Selenium script (`automate_quiz.py`) automates:
- Launching the quiz
- Clicking "Start Quiz"
- Navigating questions
- Selecting answers
- Submitting the quiz
- Capturing screenshots
- Logging execution steps

---

## 📁 Project Structure

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

## 🚀 How to Run the Project

### Option 1 — Open Directly
Double-click **index.html**  
*(Works fine for most browsers)*

### Option 2 — Recommended (Local Server)
Run:

```bash
python -m http.server 8000
```

Then open:

```
http://localhost:8000
```

This avoids restrictions some browsers have for `file://` URLs.

---

## 🧪 How to Use the Quiz (Manually)

1. Select category & difficulty  
2. Click **Start Quiz**  
3. Answer each question  
4. Watch the **timer** + **progress bar**  
5. Navigate using **Next** / **Previous**  
6. Click **Submit**  
7. Check:
   - Score  
   - Correct/Incorrect counts  
   - Breakdown  
   - Time per question  
   - Charts (Bar + Doughnut)  

8. You can toggle between **Light** and **Dark** theme anytime.

---

## 🤖 Selenium Automation

### 📌 Requirements

Install dependencies:

```bash
pip install selenium webdriver-manager
```

Use a virtual environment if needed:

```bash
python -m venv venv
venv\Scripts\activate     # Windows
source venv/bin/activate  # Mac/Linux
```

### ▶ Run automation

```
cd automation
python automate_quiz.py
```

### 📸 Automation Output
Saves files to `automation/screenshots/`:

- `landing.png`
- `question1.png`
- `result.png`
- `automation_log.txt`

These are required for Frugal Testing's submission.

---

## 🧪 What the Automation Script Tests

- Verifies page loads  
- Prints page title  
- Clicks **Start Quiz**  
- Validates first question appears  
- Selects answers for all questions  
- Navigates using Next  
- Submits quiz  
- Verifies result analysis page  
- Captures screenshots  
- Writes execution log  

---

## 📦 Technologies Used

### **Frontend**
- HTML5  
- CSS3 (Animations, Dark Mode, Responsive Layout)  
- Vanilla JavaScript  
- Chart.js (for results)

### **Testing**
- Selenium WebDriver  
- WebDriver Manager (auto-installs ChromeDriver)

---

## 🎥 Screen Recording (Submission Requirement)
Use any tool:
- OBS Studio  
- ShareX  
- Windows Screen Recorder (Win+G)  
- Loom  

Record:
1. Manual interaction **OR**
2. Selenium automation execution  

Then upload to Google Drive and include the link in your assignment.

---

## 📝 Known Good Browser Setup
- Google Chrome (latest version)
- ChromeDriver (handled automatically by `webdriver-manager`)
- JavaScript must be enabled

---

## 🧩 Troubleshooting

### ❌ Selenium fails to install
Run:

```bash
python -m pip install --upgrade pip setuptools wheel
pip install selenium webdriver-manager
```

### ❌ Chrome version error
Update Chrome or delete the driver cache:

```
%USERPROFILE%\.wdm
```

### ❌ Chart not visible
Enable internet for Chart.js CDN OR download Chart.js locally.

### ❌ Timer not working
Check console for JS errors.

---

## 📜 License
Free to use for academic and project submission purposes.

---

## ✨ Credits
This project was built as part of the **Frugal Testing Software Engineer** assignment and demonstrates both:  
- Frontend development  
- Automated UI testing  

