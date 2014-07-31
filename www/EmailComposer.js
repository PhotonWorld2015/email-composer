function EmailComposer() {
	this.resultCallback = function(){
	    console.log("*** EmailComposer -> Default empty callback");
	};

	this.errorCallback = function(){
        console.log("*** EmailComposer -> Default error callback");
    };
}

EmailComposer.ComposeResultType = {
	Cancelled : 0,
	Saved : 1,
	Sent : 2,
	Failed : 3,
	NotSent : 4
}

// showEmailComposer : all args optional

EmailComposer.prototype.showEmailComposer = function(subject, body,
		toRecipients, ccRecipients, bccRecipients, bIsHTML, attachments, attachmentsData) {
	console.log("*** EmailComposer -> showEmailComposer()");
	var args = {};
	if (toRecipients)
		args.toRecipients = toRecipients;
	if (ccRecipients)
		args.ccRecipients = ccRecipients;
	if (bccRecipients)
		args.bccRecipients = bccRecipients;
	if (subject)
		args.subject = subject;
	if (body)
		args.body = body;
	if (bIsHTML)
		args.bIsHTML = bIsHTML;
	if (attachments)
		args.attachments = attachments;
    if (attachmentsData)
        args.attachmentsData = attachmentsData;

	cordova.exec(this.resultCallback, this.errorCallback, "EmailComposer", "showEmailComposer", [ args ]);
}

EmailComposer.prototype.showEmailComposerWithCallback = function(callback,
		subject, body, toRecipients, ccRecipients, bccRecipients, isHTML,
		attachments, attachmentsData) {
	this.resultCallback = callback;
	this.showEmailComposer.apply(this, [ subject, body, toRecipients,
			ccRecipients, bccRecipients, isHTML, attachments, attachmentsData]);
}

EmailComposer.prototype._didFinishWithResult = function(res) {
	this.resultCallback(res);
}

cordova.addConstructor(function() {
	console.log("*** EmailComposer -> AppGyverVersion");
	if (!window.plugins) {
		window.plugins = {};
	}

	// shim to work in 1.5 and 1.6
	if (!window.Cordova) {
		window.Cordova = cordova;
	}
	;

	window.plugins.emailComposer = new EmailComposer();
});