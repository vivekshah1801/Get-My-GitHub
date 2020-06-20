// Get My GitHub

// creating a menu entry in chrome.
chrome.contextMenus.create({
	'title': 'Get %s\'s GitHub Stats',
	'contexts': ['selection'],
	'onclick': async (context) =>  {
        const name = context.selectionText;

        // call to github API
        let response = await fetch(`https://api.github.com/users/${name}`);
        response = await response.json();
        let alertText = "No Such User Found";
        if(response.message != "Not Found" )
        {
            alertText = `Github Username:   ${response.login}`;
            alertText += `\nUser Since:   ` + dateDiff(response.created_at);
            if (response.name)
                alertText += `\nPublic Name:   ${response.name}`;
            alertText += `\nPublic Repositories:   ${response.public_repos}\nFollowers: ${response.followers}\nFollowing: ${response.following}`;
            if (response.email)
                alertText += `\nEmail:   ${response.email}`;
            if (response.blog)
                alertText += `\nEmail:   ${response.blog}`;
        }
		alert(alertText);
	}
});

// function to get date difference
function dateDiff(startingDate) {
    var startDate = new Date(startingDate);
    var endDate = new Date();
    var startYear = startDate.getFullYear();
    var february = (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0 ? 29 : 28;
    var daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    var yearDiff = endDate.getFullYear() - startYear;
    var monthDiff = endDate.getMonth() - startDate.getMonth();
    if (monthDiff < 0) {
        yearDiff--;
        monthDiff += 12;
    }
    var dayDiff = endDate.getDate() - startDate.getDate();
    if (dayDiff < 0) {
        if (monthDiff > 0) {
            monthDiff--;
        } else {
            yearDiff--;
            monthDiff = 11;
        }
        dayDiff += daysInMonth[startDate.getMonth()];
    }
    return yearDiff + ' Years ' + monthDiff + ' Months ' + dayDiff + ' Days';
}
