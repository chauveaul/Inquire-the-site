# <p align="center">Inquire the Site</p>
 <p align="center">Inquire the site is a web application powred by AI that crawls through a given url to find precise information about a specific question</p>
 <br>
 <p align="center"> <img src="https://ziadoua.github.io/m3-Markdown-Badges/badges/Javascript/javascript3.svg"> <img src="https://ziadoua.github.io/m3-Markdown-Badges/badges/Firebase/firebase1.svg"> <img src="https://ziadoua.github.io/m3-Markdown-Badges/badges/Express/express1.svg"> <img src="https://ziadoua.github.io/m3-Markdown-Badges/badges/HTML/html1.svg"> <img src="https://ziadoua.github.io/m3-Markdown-Badges/badges/CSS/css1.svg"> <img src="https://ziadoua.github.io/m3-Markdown-Badges/badges/NodeJS/nodejs1.svg"></p>
<hr>

## 🤔 How to use it

To start making the best of Inquire the Site, head over to this [link](https://inquire-the-site.web.app)

### Choose a base link
This will let the application know where to start its search from. Grab the link of something that you want to know more about (ex. give the site of a university and ask for more information about their programs). After that, tell the program how long it can search for (default is 10 seconds) before terminating its search if it wasn't conclusive.

![1](https://github.com/user-attachments/assets/24f6da59-db12-4659-b939-96a47f4e3b02)

 ![Screenshot 2024-11-06 at 8 24 05 AM](https://github.com/user-attachments/assets/931a0828-b231-4979-a071-7be0f8dabb68)

### Ask a question
Now that the base link is set, you can ask a question and let Inquire the Site do the rest. If no answer was found, you can either reformulate your question or increase the search time as mentioned above.

![3](https://github.com/user-attachments/assets/49f3669e-b0d2-4d85-a4e2-ba6497768965)

### Change your profile picture
Inquire the Site has an auth system and you can make an account to change the profile picture. To do so, head over to the top right corner of your screen and click on the account icon. Then, follow the registration steps and head back to the account icon every time you want to make modifications to your account.

![4](https://github.com/user-attachments/assets/113bff16-da64-4d3c-835d-149c38128361)

![6](https://github.com/user-attachments/assets/e6aeb2cb-4381-46ab-96b7-7926a6304a41)

## 🤨 How it was made

### Frontend
The frontend was made entirely with vanilla JavaScript, HTML and CSS. 

### Backend
The backend was realized with firebase. I utilized their authentication to make the implementation much easier, I utilized firestore to store the account data, such as User ID and profile pictures, and I used server-side functions to make ai requests

### Logic
The logic of Inquire the Site is pretty straightforward. When you ask a question, it is sent to an openai model to interpret its keywords. After that, we crawl the given website and look for any references of the keywords in the page header title and once we find a conclusive match, we scrape the HTML contents and give it to the openai model once again to summarize everything.

# ⚖️ License
Inquire the Site is licensed under the [MIT License](LICENSE)
