"""
Automation script for Frugal Quiz App
- Prints page URL and title
- Starts quiz
- Selects an answer for each question (example: option index 2)
- Submits the quiz
- Verifies result text and saves screenshots/logs

Usage:
  pip install selenium webdriver-manager
  python automate_quiz.py
"""

import time
import os
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Optional: use webdriver-manager to auto-download chromedriver
try:
    from webdriver_manager.chrome import ChromeDriverManager
    CHROME_SERVICE = Service(ChromeDriverManager().install())
except Exception:
    # fallback: assume chromedriver on PATH
    CHROME_SERVICE = Service()

# config
LOCAL_HTML = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'index.html'))
START_URL = f"file://{LOCAL_HTML}"
SCREENSHOT_DIR = os.path.join(os.path.dirname(__file__), 'screenshots')
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

def log(msg):
    t = time.strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{t}] {msg}")

def main():
    log("Starting automation")
    options = webdriver.ChromeOptions()
    options.add_argument("--start-maximized")
    driver = webdriver.Chrome(service=CHROME_SERVICE, options=options)

    wait = WebDriverWait(driver, 10)
    try:
        driver.get(START_URL)
        time.sleep(1)
        log("Opened page")
        log("URL: " + driver.current_url)
        log("Title: " + driver.title)

        # screenshot landing
        landing_shot = os.path.join(SCREENSHOT_DIR, 'landing.png')
        driver.save_screenshot(landing_shot)
        log(f"Saved landing screenshot: {landing_shot}")

        # Select "All" category (by default) and difficulty
        # Click Start
        start_btn = wait.until(EC.element_to_be_clickable((By.ID, "startBtn")))
        start_btn.click()
        log("Clicked Start Quiz")
        time.sleep(1)

        # Ensure first question is displayed
        qIndex = wait.until(EC.visibility_of_element_located((By.ID, "qIndex")))
        log("qIndex text: " + qIndex.text)
        driver.save_screenshot(os.path.join(SCREENSHOT_DIR, 'question1.png'))

        # For each question: select the 3rd option (index 2) if present, else pick first available
        while True:
            # find options list
            options_list = wait.until(EC.presence_of_element_located((By.ID, "optionsList")))
            items = options_list.find_elements(By.TAG_NAME, "li")
            # pick index 2 if exists else 0
            pick_idx = 2 if len(items) > 2 else 0
            items[pick_idx].click()
            log(f"Selected option index {pick_idx} on {qIndex.text}")
            # small pause to simulate user
            time.sleep(0.8)
            # try to go to next
            next_btn = driver.find_element(By.ID, "nextBtn")
            # If last question, the "Next" will still be present but we want to click until it's last
            next_btn.click()
            time.sleep(0.8)
            # check if results section displayed (by checking visibility of submit or qIndex change)
            # Break condition: if resultSection visible, stop
            result_sec = driver.find_elements(By.ID, "resultSection")
            # We can't reliably detect end here; instead attempt to find 'submitBtn' and click when on last.
            # Safer approach: check qIndex text to infer if last
            q_text = driver.find_element(By.ID, "qIndex").text
            log("Now: " + q_text)
            # read total count
            try:
                parts = q_text.split('/')
                current = int(parts[0].replace('Question','').strip())
                total = int(parts[1].strip())
            except Exception:
                current = 1; total = 1
            if current >= total:
                break

        # Now click Submit
        submit_btn = driver.find_element(By.ID, "submitBtn")
        submit_btn.click()
        log("Clicked Submit")
        time.sleep(1)

        # Confirm popup - JS confirm
        try:
            alert = driver.switch_to.alert
            alert.accept()
            log("Confirmed submit alert")
        except Exception:
            pass

        # Wait for resultSection to show score
        score_text = wait.until(EC.visibility_of_element_located((By.ID, "scoreText")))
        log("Score Text: " + score_text.text)

        # final screenshot
        final_shot = os.path.join(SCREENSHOT_DIR, 'result.png')
        driver.save_screenshot(final_shot)
        log(f"Saved result screenshot: {final_shot}")

        # Save a small log file
        with open(os.path.join(SCREENSHOT_DIR, 'automation_log.txt'), 'w') as f:
            f.write(f"URL: {driver.current_url}\nTitle: {driver.title}\nScore: {score_text.text}\n")

        log("Automation completed successfully.")
    except Exception as e:
        log("Error during automation: " + str(e))
        try:
            err_shot = os.path.join(SCREENSHOT_DIR, 'error.png')
            driver.save_screenshot(err_shot)
            log(f"Saved error screenshot: {err_shot}")
        except:
            pass
    finally:
        driver.quit()

if __name__ == "__main__":
    main()
