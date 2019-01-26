var spamSites = ["fronda.pl",
"tvp.pl",
"tvp.info",
"nczas.pl",
"wpolityce.pl",
"dorzeczy.pl",
"niezależna.pl",
"radiomaryja.pl", 
"telewizjarepublika.pl",
"pch24.pl",
"wgospodarce.pl",
"tysol.pl",
"alternews.pl",
"alexjones.pl",
"dziennik-polityczny.com",
"hnews.pl",
"koniec-swiata.org",
"magnapolonia.org",
"narodowcy.net",
"nczas.com",
"ndie.pl",
"neon24.pl",
"newsweb.pl",
"parezja.pl",
"pikio.pl",
"prostozmostu24.pl",
"prawdaobiektywna.pl",
"reporters.pl",
"sioe.pl",
"wmeritum.pl",
"wolnosc24.pl",
"wolna-polska.pl",
"wprawo.pl",
"wsensie.pl",
"zmianynaziemi.pl",
"wolnemedia.net",
"niewiarygodne.info.pl"];


function isDescendant(parent, child) {
	if (child === undefined || child === null)
	{
		return false;
	}
    var node = child.parentNode;
    while (node != null) {
    	if (node == parent) {
    		return true;
		}
		node = node.parentNode;
	}
	return false;
}

var sources = document.querySelectorAll('[title="Otwórz źródło znaleziska"]');
var spamSources = new Set();
for (s of sources)
{
	spamSites.forEach(function(spamSite) {
		if(s.innerText.includes(spamSite))
		{
			spamSources.add(s.parentNode.parentNode.parentNode.parentNode);
		}
	});	
}

function fakeClicks(spamSources, title) {
	var fakes = document.querySelectorAll('[title="' + title + '"]');

	for (f of fakes)
    {
		spamSources.forEach(spamSource => {
			if (isDescendant(spamSource, f))
			{
				console.log(title);
				console.log(f);
				f.click();
			}
		});   	
    }
}

function downvoteSpam() {
	var downvotes = document.evaluate("//a[contains(., 'nie nadaje się')]", document, null, XPathResult.ANY_TYPE, null );
	var downvote = downvotes.iterateNext();
	while(downvote) {
		spamSources.forEach(spamSource => {
			if (isDescendant(spamSource, downvote))
			{
				console.log("ZAKOP " + spamSource.innerText);
				downvote.click();
			}
		});
		downvote = downvotes.iterateNext();
	}
  	
}

fakeClicks(spamSources, "wykop to znalezisko");
setTimeout(function() { fakeClicks(spamSources, "cofnij wykop"); }, 1000);
setTimeout(function() { downvoteSpam(); }, 2000);

