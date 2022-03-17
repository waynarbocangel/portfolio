Waynar Bocangel Calderon
PID: A15881859

https://waynarbocangel.com

This is hosted on a personal server using an express server as back-end. I wanted to put it up there by the end of the class so I worked to project knowing that it would go there. All NodeJS files are also listed in the submission for your grading. The file for the crud system is console.html and the authentication system is in auth.html. 

I used web-components for mostly everything that had to do with the CRUD functionality. This was extremely effective and time saving because it allowed easy programatic display of the items. I would have liked to add an image compression function to the CRUD elements because that would make the page more performant in general but would also help with making images better.

Using an express back-end helped a lot with the project because it allowed me to create abstractions over the firebase api extremely easily. Another thing was also the fact that the firebase api was a lot less janky for NodeJS since it didn't focus on stripping the functionality for performance. I originally tried managing the system through the front-end as seen in the dbManager.js file. Although I could have made everything work equally as well, it would have been more strenous to do. Besides handling the database from the back-end allowed for an extra very simple layer of security by not reavealing secrets in the front-end. Granted, this could have been achieved through Firebase's Cloud functions, but in the interest of time it was more straightforward to implement everything in the backend.

As for front-end frameworks, the truth is that they are not needed for a site like this. There is nothing a framework could provide except for maybe a marginally better developer experience in exchange for performance losses. The web-components API accomplishes the purpose fairly easily and with very little problems. Its support may be limited in browsers like Safari (possibly solvable with a polyfil) for more complex tasks, but for the purposes of this class there is no experience loss without frameworks.
