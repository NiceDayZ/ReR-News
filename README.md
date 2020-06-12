# Umbrella API Docs (PUBLIC)<a id="publicAPI">

video prezentare: https://www.youtube.com/watch?v=XpaApq81EKc

### Jump to [PRIVATE](#privateAPI)

>Keep in mind that if the response status (success) is false then the object that should be returned is null and the response comes with a message that represent the error

## Fast Travel
[News Module](#newsmod)

[Images Module](#imgmod)

[Videos Module](#vidmod)

[Books Module](#booksmod)

## News Module <a id="newsmod">

`GET /api/news`

### Request Query

|FieldName		 |Required| Mentions |
|----------------|-------------------------------| -|
|[categories](#newscat)|no| if there are multiple categories they should be separated by a single comma
|keywords|no|
|country|no          	 |this might influence the language of the news too

<br>

### Response


|FieldName		 |Datatype						 |
|----------------|-------------------------------|
|success|Boolean  			         |
|news|Array<[News](#News)> or null
|message|String or null		             	 |

#### Example Response

```json
{

"success":  true,

"news":  [
	{
		"source":  {
			"id":  "fox-news",
			"name":  "Fox News"
		},
		"author":  "Madeline Farber",
		"title":  "Amid coronavirus, CDC offers guidelines on office reopenings - Fox News",
		"description":  "With many states gradually easing coronavirus lockdowns, the Centers for Disease Control and Prevention has issued guidelines for reopening offices.",
		"url":  "https://www.foxnews.com/health/amid-coronavirus-cdc-offers-guidelines-on-office-reopenings",
		"urlToImage":  "https://static.foxnews.com/foxnews.com/content/uploads/2020/05/iStock-1144557718-1.jpg",
		"publishedAt":  "2020-05-28T17:30:41Z",
		"content":  "Get all the latest news on coronavirus and more delivered daily to your inbox. Sign up here.\r\nWith many states gradually easing coronavirus lockdowns, the Centers for Disease Control and Prevention (… [+2531 chars]"
		},
	{
		"source":  {
			"id":  null,
			"name":  "NBCSports.com"
		},
		"author":  "Michael David Smith",
		"title":  "NFL teams are 0-104 when needing an onside kick in last two years - NBCSports.com",
		"description":  "Since the NFL changed its kickoff rules two years ago and made recovering an onside kick more difficult, no team has won a game when it needed to recover an onside kick. According to Michael Lopez, director of data and analytics for the NFL, teams are 0-104 i…",
		"url":  "https://profootballtalk.nbcsports.com/2020/05/28/nfl-teams-are-0-104-when-needing-an-onside-kick-in-last-two-years/",
		"urlToImage":  "https://profootballtalk.nbcsports.com/wp-content/uploads/sites/25/2020/05/GettyImages-1192083140-1-e1590686692152.jpg",
		"publishedAt":  "2020-05-28T17:25:00Z",
		"content":  "Since the NFL changed its kickoff rules two years ago and made recovering an onside kick more difficult, no team has won a game when it needed to recover an onside kick.\r\nAccording to Michael Lopez, … [+769 chars]"
		},
	]
}
```

### News Object <a id="News">

|FieldName		 |Datatype						 | Description
|----------------|-------------------------------|--|
|source|[Source](#Source)| information about the article source
|author|String		             	 |
|title| String|
|description| String|
|url| String| URL that redirect to the website of the article
|urlToImage| String| Link that should be used as image source
|publishedAt| String| Date in ISOString format
|content| String| Small snippet of the new content

### Source <a id="Source">

|FieldName		 |Datatype						 | Description
|----------------|-------------------------------|--|
|id|String| formatted name for the source (e.g. fox-news)
|name|String		             	 | actual name of the source (e.g. Fox News)


### News Categories<a id="newscat">
|Category|
|:-:|
|business|
|entertainment|
|general|
|health|
|science|
|sports|
|technology|






## Images Module <a id="imgmod">


`GET /api/images`

### Request Query

|FieldName		 |Required| Mentions |
|----------------|-------------------------------| -|
|[categories](#imgcat)|no| if there are multiple categories they should be separated by a single comma
|keywords|no|


### Response


|FieldName		 |Datatype						 |
|----------------|-------------------------------|
|success|Boolean  			         |
|images|Array<[Image](#Images)> or null
|message|String or null		             	 |

#### Example Response

```json
{
    "success": true,
    "images": [
        {
            "id": 5168549,
            "pageURL": "https://pixabay.com/photos/gramophone-turntable-music-vinyl-5168549/",
            "type": "photo",
            "tags": "gramophone, turntable, music",
            "previewURL": "https://cdn.pixabay.com/photo/2020/05/13/18/56/gramophone-5168549_150.jpg",
            "previewWidth": 150,
            "previewHeight": 100,
            "webformatURL": "https://pixabay.com/get/53e1d34b4f56a514f1dc84609629317c143bd8e0574c704c7c2f7ddd9149c558_640.jpg",
            "webformatWidth": 640,
            "webformatHeight": 427,
            "largeImageURL": "https://pixabay.com/get/53e1d34b4f56a514f6da8c7dda793678173edae356556c4870267bd29e4bc158b8_1280.jpg",
            "imageWidth": 5184,
            "imageHeight": 3456,
            "imageSize": 4671477,
            "views": 18190,
            "downloads": 15272,
            "favorites": 114,
            "likes": 142,
            "comments": 23,
            "user_id": 2364555,
            "user": "pixel2013",
            "userImageURL": "https://cdn.pixabay.com/user/2020/05/19/19-55-28-784_250x250.jpg"
        },
        {
            "id": 5218997,
            "pageURL": "https://pixabay.com/photos/heron-grey-heron-bill-bird-5218997/",
            "type": "photo",
            "tags": "heron, grey heron, bill",
            "previewURL": "https://cdn.pixabay.com/photo/2020/05/25/15/06/heron-5218997_150.jpg",
            "previewWidth": 150,
            "previewHeight": 100,
            "webformatURL": "https://pixabay.com/get/53e2d44b435bab14f1dc84609629317c143bd8e0574c704c7c2f7ddd9149c558_640.jpg",
            "webformatWidth": 640,
            "webformatHeight": 427,
            "largeImageURL": "https://pixabay.com/get/53e2d44b435bab14f6da8c7dda793678173edae356556c4870267bd29e4bc158b8_1280.jpg",
            "imageWidth": 5647,
            "imageHeight": 3765,
            "imageSize": 3805934,
            "views": 264,
            "downloads": 183,
            "favorites": 4,
            "likes": 25,
            "comments": 20,
            "user_id": 10084616,
            "user": "Nennieinszweidrei",
            "userImageURL": "https://cdn.pixabay.com/user/2018/11/04/09-42-05-515_250x250.jpeg"
        },
    ]
}
```

### Image Object <a id="Images">

|FieldName		 |Datatype						 | Description
|----------------|-------------------------------|--|
|id|Integer| Unique Id
|pageURL|String| Url to the image source page (not to be used as image source)
|type| String|
|tags| String| some words that describe the image
|previewURL| String| Thumbnail
|previewWidth| Integer| Thumbnail width
|previewHeight| Integer| Thumbnail height
|webformatURL| String| Medium Image (could be used as image source but it is preferably to use the large one)
|webformatWidth|Integer| Medium Image Width
|webformatHeight|Integer| Medium Image Height
|largeImageURL|String| Large Image (this should be used as image source)
|imageWidth|Integer| Large Image Width
|imageHeight|Integer| Large Image Height
|imageSize|Integer|size in bytes
|views|Integer|how many people saw the picture
|downloads|Integer|downloads from the main page
|favorites|Integer|how many people add the image to favorites
|likes|Integer|I don't know how this is different from favorites but whatever
|comments|Integer|How many comments it has on Pixart
|user_id|Integer|id of the user who uploaded
|user|String|Name of the user who uploaded it
|userImageURL|String|Thumbnail of the profile picture


### Images Categories<a id="imgcat">
|Category|
|:-:|
|backgrounds|
|fashion|
|nature|
|science|
|education|
|feelings|
|health|
|people|
|religion|
|places|
|animals|
|industry|
|computer|
|food|
|sports|
|transportation|
|travel|
|buildings|
|business|
|music|


## Video Module <a id="vidmod">

`GET /api/videos`

### Request Query

|FieldName		 |Required| Mentions |
|----------------|:-------------------------------:| -|
|[categories](#vidcat)|yes if keywords| if there are multiple categories they should be separated by a single comma, if no categories are selected the API will return results from 3 random categories
|keywords|no|

<br>

### Response


|FieldName		 |Datatype						 |
|----------------|-------------------------------|
|success|Boolean  			         |
|news|Array<[Video](#Videos)> or null
|message|String or null		             	 |

#### Example Response

```json
{
    "success": true,
    "videos": [
        {
            "name": "FITC Tokyo 2015 Titles Process Reel",
            "description": "See the titles: https://vimeo.com/118919656\n\n♫ Hauschka - Agdam\n\nCredits\nDirector: Ash Thorp\nProducer: Andrew Hawryluk\nArt Director: Michael Rigley\nType Designer: Nicolas Girard\nDesigners: Ash Thorp, Michael Rigley, Nicolas Girard\nType Animators: Nicolas Girard, Alasdair Willson\nAnimators: Michael Rigley, Chris Bjerre, Andrew Hawryluk \nComputational Artist: Albert Omoss\nProcess Reel Editor: Franck Deron\nComposer....",
            "link": "https://vimeo.com/118998266",
            "html": "<iframe src=\"https://player.vimeo.com/video/118998266?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=174298\" width=\"1920\" height=\"1080\" frameborder=\"0\" allow=\"autoplay; fullscreen\" allowfullscreen title=\"FITC Tokyo 2015 Titles Process Reel\"></iframe>",
            "duration": 121,
            "created": "2015-02-07T16:20:39+00:00",
            "modified": "2020-05-28T22:02:19+00:00"
        },
        {
            "name": "Phoenix - 'Trying To Be Cool / Drakkar Noir'",
            "description": "Directed by CANADA\nProduced by CANADA",
            "link": "https://vimeo.com/69740567",
            "html": "<iframe src=\"https://player.vimeo.com/video/69740567?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=174298\" width=\"1280\" height=\"720\" frameborder=\"0\" allow=\"autoplay; fullscreen\" allowfullscreen title=\"Phoenix - &amp;#039;Trying To Be Cool / Drakkar Noir&amp;#039;\"></iframe>",
            "duration": 386,
            "created": "2013-07-05T10:35:16+00:00",
            "modified": "2020-05-28T22:01:05+00:00"
        },
        {
            "name": "My Recurring Dream",
            "description": "Part 3 of the Cold Mailman trilogy is out: https://vimeo.com/124919395\n\nDirector: André Chocron\nProducer: Andrea Ottmar\n\nMusic by // COLD MAILMAN\n\niTunes: http://smarturl.it/MRD_iTunes\nSpotify: http://smarturl.it/MRD_Spotify\n\nIn association with: Norsk Filminstitutt & Fond for lyd og bilde\nCo-prod.....",
            "link": "https://vimeo.com/58879954",
            "html": "<iframe src=\"https://player.vimeo.com/video/58879954?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=174298\" width=\"1280\" height=\"720\" frameborder=\"0\" allow=\"autoplay; fullscreen\" allowfullscreen title=\"My Recurring Dream\"></iframe>",
            "duration": 275,
            "created": "2013-02-04T11:46:51+00:00",
            "modified": "2020-05-28T21:57:51+00:00"
        },

	]
}
```

### Video Object <a id="Videos">

|FieldName		 |Datatype						 | Description
|----------------|-------------------------------|--|
|name|String| title
|description|String|
|link| String| link to vimeo
|description| String|
|html| String| iframe
|duration| Integer| Time in s
|created| String| Date in ISOString format
|modified| String| Date in ISOString format


### Videos Categories<a id="vidcat">
|Category|
|:-:|
|animation|
|art|
|cameratechniques|
|comedy|
|documentary|
|experimental|
|fashion|
|food|
|instructionals|
|music|
|narrative|
|personal|
|journalism|
|sports|
|talks|
|travel|

## Book Module <a id="booksmod">

`GET /api/books`

### Request Query

|FieldName		 |Required| Mentions |
|----------------|:-------------------------------:| -|
|[categories](#bookscat)|no| if there are multiple categories they should be separated by a single comma, if no categories are selected the API will return results from 5 random categories
|keywords|no|

<br>

### Response


|FieldName		 |Datatype						 |
|----------------|-------------------------------|
|success|Boolean  			         |
|news|Array<[Book](#Books)> or null
|message|String or null		             	 |

#### Example Response

```json
{
    "success": true,
    "books": [
        {
            "title": "Culture Shift in Advanced Industrial Society",
            "author": "Ronald Inglehart",
            "publishedDate": "1990",
            "description": "Economic, technological, and sociopolitical changes have been transforming the cultures of advanced industrial societies in profoundly important ways during the past few decades. This ambitious work examines changes in religious beliefs, in motives for work, in the issues that give rise to political conflict, in the ...",
            "image": "http://books.google.com/books/content?id=ztYnOnSgs1EC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            "pages": 484,
            "link": "http://books.google.ie/books/download/Culture_Shift_in_Advanced_Industrial_Soc-sample-pdf.acsm?id=ztYnOnSgs1EC&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api",
            "preview": "http://play.google.com/books/reader?id=ztYnOnSgs1EC&hl=&printsec=frontcover&source=gbs_api"
        },
        {
            "title": "A Guidebook of Statistical Software for the Social and Behavioral Sciences",
            "author": "Ned Clayton Silver",
            "publishedDate": "1998",
            "description": "Over 400 descriptions of statistical computer programs are described in one easy-to-use volume. Written in a user-friendly manner, this reference includes author and key word indices for easy accessibility.",
            "image": "http://books.google.com/books/content?id=KxxBAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
            "pages": 461,
            "link": null,
            "preview": "http://play.google.com/books/reader?id=KxxBAAAAMAAJ&hl=&printsec=frontcover&source=gbs_api"
        },
        {
            "title": "Klepto",
            "author": "Jenny Pollack",
            "publishedDate": "2008",
            "description": "In 1981, fourteen-year-old Julie, a drama major at the High School of Performing Arts in New York City, becomes best friends with an attractive new girl who introduces Julie to the exciting but dangerous world of shoplifting.",
            "image": "http://books.google.com/books/content?id=CuDLetY0cvsC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
            "pages": 273,
            "link": null,
            "preview": "http://play.google.com/books/reader?id=CuDLetY0cvsC&hl=&printsec=frontcover&source=gbs_api"
        },
	]
}
```

### Book Object <a id="Books">

|FieldName		 |Datatype						 | Description
|----------------|-------------------------------|--|
|title|String|
|author|String|
|publishedDate| String|
|description| String|
|image| String| cover image
|pages| Integer| Number of pages
|link| String or null| link to the free book sample or buy link
|preview| String or null| link to the book preview (if it has one)


### Books Categories<a id="bookscat">
|Category|
|:-:|
|comedy|
|adventure|
|drama|
|horror|
|romance|
|action|
|science|
|fiction|
|science_fiction|
|detective|
|biography|
|psychology|
|self_help|
|philosophy|
|arts|
|dictionary|
|parenting|
|poetry|
|critics|
|sport|
|health|
|crime|
|mystery|
|social|
|educational|
|economics|



# Umbrella API Docs (PRIVATE)<a id="privateAPI">
### Jump to [PUBLIC](#publicAPI)

# User Module

## Fast Travel

[Login](#login)

[Register](#Register)

[Change Password](#changepassword)

[Profile](#profile)

[Preferences](#preferences)

[RSS](#rss)

--[Data Types](#datatypes)--

## Login<a id="login">

`POST /user/login`

### Request Body

|FieldName		 |Required| Type|
|----------------|:-------------------------------:| -|
|email|yes| String
|password|yes| String

#### Example Request Body

```json
{
	"email": "email@domain.xy",
	"password": "password1234"
}
```

<br>

### Response


|FieldName		 |Datatype						 |
|----------------|-------------------------------|
|success|Boolean  			         |
|token|String or null
|message|String or null		             	 |

#### Example Response

```json
{
	"success":  true,
	"token":  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWQ5MDdmYzRmNWYxZTcxYTBhOWQwYmMiLCJpYXQiOjE1OTEzOTA5NTF9.E3r2uEKR_PXo20YMnzQoWxsIDWgI3bjqcsLiJ5GfFxw"
}
```

or

```json
{
	"success":  false,
	"message":  "Email or password incorrect"
}
```

## Register<a id="register">

`POST /user/register`

### Request Body

|FieldName		 |Required| Type|
|----------------|:-------------------------------:| -|
|email|yes| String
|password|yes| String
|name|yes|String
|userName|yes|String

#### Example Request Body

```json
{
	"email": "email@domain.xy",
	"password": "password1234",
	"name": "Mihai Cosmin",
	"userName": "Bear"
}
```

<br>

### Response


|FieldName		 |Datatype						 |
|----------------|-------------------------------|
|success|Boolean  			         |
|message|String or null		             	 |

#### Example Response

```json
{
	"success":  true
}
```

or

```json
{
	"success":  false,
	"message":  "User already exists"
}
```
## Change Password<a id="changePassword">

`POST /user/changePassword`

Auth(Header) : `x-auth-token`

### Request Body

|FieldName		 |Required| Type|
|----------------|:-------------------------------:| -|
|oldPassword|yes| String
|newPassword|yes|String

#### Example Request Body

```json
{
	"oldPassword": "password1234",
	"newPassword": "betterpassword1234"
}
```

<br>

### Response


|FieldName		 |Datatype						 |
|----------------|-------------------------------|
|success|Boolean  			         |
|message|String or null		             	 |

#### Example Response

```json
{
	"success":  true
}
```

or

```json
{
	"success":  false,
	"message":  "Old password incorrect"
}
```

## Profile<a id="profile">

[Get User Profile](#getprofile)

[Change User Profile](#putprofile)

### Get User Profile <a id="getprofile">

`GET /user/profile` 

Auth(Header) : `x-auth-token`

### Request Body

```json
{

}
```

<br>

### Response


|FieldName		 |Datatype						 |
|----------------|-------------------------------|
|success|Boolean  			         |
|user| [User](#userType) or null | 
|message|String or null		             	 |

#### Example Response

```json
{
	"success":  true,
    "user": {
        "name": "Mihai Craciun",
        "userNmae": "Bear",
        "email": "craciunmihai40@gmail.com",
        "gender": "male",
        "preferences": {
            "customRSS": [
                {
                    "link": "https://www.ziaruldeiasi.ro/rss",
                    "enabled": true
                },
                {
                    "link": "https://css-tricks.com/feed",
                    "enabled": true
                }
            ],
            "newsPref": [],
            "imagesPref": [],
            "videosPref": [],
            "booksPref": [],
            "_id": "5ed907fc4f5f1e71a0a9d0bb",
            "createdAt": "2020-06-04T14:41:00.395Z",
            "updatedAt": "2020-06-04T15:30:59.550Z",
            "__v": 0
        }
    }
}
```

or

```json
{
	"success":  false,
	"message":  "Invalid Token"
}
```
<br>
<br>



### Change User Profile <a id="putprofile">

`PUT /user/profile`

Auth(Header) : `x-auth-token`

### Request Body

|FieldName		 |Required| Type|
|----------------|:-------------------------------:| -|
|name|no| String
|userName|no|String
|gender|no|String ("male" or "female"...miss me with that gender fluid thing)

#### Example request body

```json
{
	"userName": "Mike",
	"gender": "male"
}
```

<br>

### Response


|FieldName		 |Datatype						 |
|----------------|-------------------------------|
|success|Boolean  			         |
|message|String or null		             	 |

#### Example Response

```json
{
	"success":  true
}
```

or

```json
{
	"success":  false,
	"message":  "Invalid Token"
}
```

## Preferences<a id="preferences">

[Get User Preferences](#getpreferences)

[Change User Preferences](#putpreferences)

### Get User Preferences<a id="getpreferences">

`GET /user/preferences` 

Auth(Header) : `x-auth-token`

### Request Body

```json
{

}
```

<br>

### Response


|FieldName		 |Datatype						 |
|----------------|-------------------------------|
|success|Boolean  			         |
|preferences| [Preferences](#preferencesType) or null | 
|message|String or null		             	 |

#### Example Response

```json
{
	"success":  true,
       "preferences": {
           "customRSS": [
               {
                   "link": "https://www.ziaruldeiasi.ro/rss",
                   "enabled": true
               },
               {
                   "link": "https://css-tricks.com/feed",
                   "enabled": true
               }
           ],
			 "newsPref": [
	            "technology",
	            "entertainment"
	        ],
	        "imagesPref": [
	            "backgrounds",
	            "science",
	            "animals",
	            "industry",
	            "computer"
	        ],
	        "videosPref": [
	            "animation",
	            "art",
	            "comedy",
	            "documentary"
	        ],
           "booksPref": [],
           "_id": "5ed907fc4f5f1e71a0a9d0bb",
           "createdAt": "2020-06-04T14:41:00.395Z",
           "updatedAt": "2020-06-04T15:30:59.550Z",
           "__v": 0
       }
}
```

or

```json
{
	"success":  false,
	"message":  "Invalid Token"
}
```
<br>
<br>



### Change User Preferences<a id="putpreferences">

`PUT /user/preferences`

Auth(Header) : `x-auth-token`

### Request Body

|FieldName		 |Required| Type|
|----------------|:-------------------------------:| -|
|news|no| Array< String > ([News Categories](#newscat))
|images|no|Array< String > ([Images Categories](#imgcat))
|videos|no|Array< String > ([Videos Categories](#vidcat))
|books|no|Array< String > ([Books Categories](#bookscat))

#### Example request body

```json
{
	"images": ["backgrounds", "science", "animals", "industry", "computer"],
	"videos": ["animation", "art", "comedy", "documentary"]
}
```

<br>

### Response


|FieldName		 |Datatype						 |
|----------------|-------------------------------|
|success|Boolean  			         |
|message|String or null		             	 |

#### Example Response

```json
{
	"success":  true
}
```

or

```json
{
	"success":  false,
	"message":  "Invalid Token"
}
```

## RSS<a id="rss">

[Add RSS to Preferences](#addRSS)

[Delete RSS from Preferences](#deleteRSS)

[Toggle RSS in Preferences](#toggleRSS)

### Add RSS to Preferences<a id="addRSS">

`PUT /user/rss` 

Auth(Header) : `x-auth-token`

### Request Body

|FieldName		 |Datatype						 |
|----------------|-------------------------------|
|rss|String|

#### Example request body

```json
{
	"rss": "https://www.ziaruldeiasi.ro/rss"
}
```

<br>

### Response


|FieldName		 |Datatype						 |
|----------------|-------------------------------|
|success|Boolean  			         |
|message|String or null		             	 |

#### Example Response

```json
{
	"success":  true
}
```

or

```json
{
	"success":  false,
	"message":  "Invalid Token"
}
```
<br>
<br>

### Remove RSS from Preferences<a id="deleteRSS">

`DELETE /user/rss` 

Auth(Header) : `x-auth-token`

### Request Body

|FieldName		 |Datatype						 |
|----------------|-------------------------------|
|rss|String|

#### Example request body

```json
{
	"rss": "https://www.ziaruldeiasi.ro/rss"
}
```

<br>

### Response


|FieldName		 |Datatype						 |
|----------------|-------------------------------|
|success|Boolean  			         |
|message|String or null		             	 |

#### Example Response

```json
{
	"success":  true
}
```

or

```json
{
	"success":  false,
	"message":  "Invalid Token"
}
```
<br>
<br>

### Toggle RSS in Preferences<a id="toggleRSS">

`PATCH /user/rss` 

Auth(Header) : `x-auth-token`

### Request Body

|FieldName		 |Datatype						 |
|----------------|-------------------------------|
|rss|String|

#### Example request body

```json
{
	"rss": "https://www.ziaruldeiasi.ro/rss"
}
```

<br>

### Response


|FieldName		 |Datatype						 |
|----------------|-------------------------------|
|success|Boolean  			         |
|message|String or null		             	 |

#### Example Response

```json
{
	"success":  true
}
```

or

```json
{
	"success":  false,
	"message":  "Invalid Token"
}
```
<br>
<br>

## Data Types<a id="datatypes">

### User<a id="userType">

|FieldName		 |Datatype						 | Details
|----------------|-------------------------------|-|
|name|String|
|userName|String		             	 ||
|email|String||
|gender|String|"male" or "female"|
|preferences|[Preferences](#preferencesType)|


### Preferences<a id="preferencesType">

|FieldName		 |Datatype						 | Details
|----------------|-------------------------------|-|
|customRSS|Array<[CustomRSS](#customRSS)>|
|newsPref|Array< String > | [News Categories](#newscat)
|imagesPref|Array< String > | [Images Categories](#imgcat)
|videosPref|Array< String > | [Videos Categories](#vidcat)
|booksPref|Array< String > | [Books Categories](#bookscat)
|_id|String|Id from db (not important)
|createdAt|String|timeStamp (not important)
|updatedAt|String|timeStamp (not important)
|__v|Integer| I'm just too lazy to delete this from the response

### CustomRSS<a id="customRSS">

|FieldName		 |Datatype						 | Details
|----------------|-------------------------------|-|
|link|String|actual link to the rss
|enabled|Boolean | if the user wants to see that feed in his feed
