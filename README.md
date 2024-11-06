# <p align="center">Inquire the Site</p>
 <p align="center">Inquire the site is a web application powred by AI that crawls through a given url to find precise information about a specific question</p>
 <br>
 <p align="center"> <img src="https://ziadoua.github.io/m3-Markdown-Badges/badges/Javascript/javascript3.svg"> <img src="https://ziadoua.github.io/m3-Markdown-Badges/badges/Firebase/firebase1.svg"> <img src="https://ziadoua.github.io/m3-Markdown-Badges/badges/Express/express1.svg"> <img src="https://ziadoua.github.io/m3-Markdown-Badges/badges/HTML/html1.svg"> <img src="https://ziadoua.github.io/m3-Markdown-Badges/badges/CSS/css1.svg"> <img src="https://ziadoua.github.io/m3-Markdown-Badges/badges/NodeJS/nodejs1.svg"></p>
<hr>

## 🤔 How to use it

To start making the best of Inquire the Site, head over to this [link](https://inquire-the-site.web.app)

### Choose a base link
This will let the application know where to start its search from. Grab the link of something that you want to know more about (ex. give the site of a university and ask for more information about their programs). After that, tell the program how long it can search for (default is 10 seconds) before terminating its search if it wasn't conclusive.

### Ask a question
Now that the base link is set, you can ask a question and let Inquire the Site do the rest. If no answer was found, you can either reformulate your question or increase the search time as mentioned above.

### Change your profile picture
Inquire the Site has an auth system and you can make an account to change the profile picture. To do so, head over to the top right corner of your screen and click on the account icon. Then, follow the registration steps and head back to the account icon every time you want to make modifications to your account.

## 🤨 How it was made

### Frontend
The frontend was made entirely with vanilla JavaScript, HTML and CSS. 

### Backend
The backend was realized with firebase. I utilized their authentication to make the implementation much easier, I utilized firestore to store the account data, such as User ID and profile pictures, and I used server-side functions to make ai requests

### Logic
The logic of Inquire the Site is pretty straightforward. When you ask a question, it is sent to an openai model to interpret its keywords. After that, we crawl the given website and look for any references of the keywords in the page header title and once we find a conclusive match, we scrape the HTML contents and give it to the openai model once again to summarize everything.

# ⚖️ License
Inquire the Site is licensed under the [MIT License](LICENSE)
