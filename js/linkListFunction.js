// Function to create a list of links in HTML format
function createLinkList(linksArray) {
    var containers = []; // Create an array to store containers
    for (var j = 0; j < linksArray.length; j++) {
        var containerDiv = document.createElement('div'); // Create a container for the list
        containerDiv.className = "linksContBlock";

        var title = document.createElement('h2'); // Create a title
        title.textContent = linksArray[j][0]; // Set the title text from the array
        containerDiv.appendChild(title); // Add the title to the container

        var ul = document.createElement('ul'); // Create a list element
        for (var i = 1; i < linksArray[j].length; i++) {
            var li = document.createElement('li'); // Create a list item
            var a = document.createElement('a'); // Create a link element
            var img = document.createElement('img'); // Create an image element for the favicon

            a.href = linksArray[j][i].url; // Set the link
            a.textContent = linksArray[j][i].text; // Set the link text

            // Create the address for loading the favicon
            var domain = new URL(linksArray[j][i].url).hostname;
            var faviconUrl = "https://www.google.com/s2/favicons?sz=64&domain=" + domain;

            img.src = faviconUrl; // Set the src for the image (favicon)
            img.alt = domain; // Set the alternative text for the image
            //img.style.width = "auto"; // Set the image width, default is 16px
            //img.style.height = "auto";

            li.appendChild(img); // Add the image (favicon) to the list item
            li.appendChild(a); // Add the link to the list item
            ul.appendChild(li); // Add the list item to the list
        }
        containerDiv.appendChild(ul); // Add the list of links to the container
        containers.push(containerDiv); // Add the container to the array
    }
    return containers; // Return the array with containers for all link lists
}

// Get the container to which we will add the list of links
var container = document.getElementById('linksContainer');

// Create the list of links
var linkLists = createLinkList(links);

// Add all lists of links to the container
linkLists.forEach(function(linkList) {
    container.appendChild(linkList);
});
