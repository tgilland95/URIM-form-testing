'use strict';
var cur;

ExecuteOrDelayUntilScriptLoaded(fetchCurrentUser, 'sp.js');

var netIdArr;
var archiveLibraryUrl = '/tylerGilland/test_forms/';
var folderName = 'tests';
var hostweburl = GetUrlKeyValue('SPHostUrl');
var wrongUserMessage = 'Please return to the site that directed you here and login to your account to try again.';
var confirmCancelMessage = "Select 'Ok' to close the current page.";
var notCheckedMessage = 'You must read and agree to the terms by clicking the checkbox on the page.';
var noNameMessage = "The 'Employee Full Name' input cannot be empty."
var currentdate = new Date();
var dt = currentdate.getFullYear() + '-' + (currentdate.getMonth() + 1) + '-' + currentdate.getDate() + '-';

function fetchCurrentUser() {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '../_api/web/currentuser');
	xhr.setRequestHeader('Accept', 'application/json;odata=verbose');
	xhr.onload = function() {
		if (xhr.status === 200) {
			setUserInfo(xhr.responseText);
		}
	};
	xhr.send();

	function setUserInfo(x) {
		x = JSON.parse(x);
		netIdArr = x.d.LoginName.split('\\');
		x.d.LoginName = netIdArr[netIdArr.length - 1];
		cur = {
			title: x.d.Title,
			login: x.d.LoginName,
			initials: ' ',
			timeStamp: dt,
		};
		checkWithUser(cur);
	}
}
function fillCurrentForm(cur) {
	$('#fullName').val(cur.title);
	$('#netID').html('&emsp;' + cur.login);
}
function checkWithUser(cur) {
	$('#first').remove();
	$('#mainForm').show();
	fillCurrentForm(cur);
	$('#submitButton').on('click', submitForm);
	$('#cancelButton').on('click', cancelForm);
}
function submitForm() {
    if ((!$('#fullName').val())) {
        window.alert(noNameMessage);
    }

	else if (!$('#submitCheckbox').is(':checked')) {
		window.alert(notCheckedMessage);
	} else if (!cur) {
		window.alert(notCheckedMessage);
	} else if ($('#submitCheckbox').is(':checked')) {
		setInitials();
		makePdf();
	}
	function setInitials() {
		var tempInitials = '';
		var a = $('#fullName').val().split(' ');
		for (var i in a) {
			tempInitials += a[i].charAt(0);
		}
		cur.initials = tempInitials;
	}
}
function cancelForm() {
    if (!window.confirm(confirmCancelMessage)) {
        return
    }
    closeWindow();
}
function makePdf() {
	var fonts = {
		Roboto: {
			normal: './public/fonts/Roboto-Regular.ttf',
			bold: './public/fonts/Roboto-Medium.ttf',
			italics: './public/fonts/Roboto-Italic.ttf',
			bolditalics: './public/fonts/Roboto-Italic.ttf',
		},
	};
	var dd = {
		content: [
			{
				text: 'Confidentiality of Records-BYU Employee Agreement',
				style: 'header',
			},
			{
				text: '(Please read the statement carefully before signing.)',
				style: 'subheader',
			},
			'\n\n\n',
			{
				columns: [
					{
						width: '50%',
						style: 'subfield',
						text: [
							/*
                         full name
                         */
							{
								text: $('#fullName').val(),
								decoration: 'underline',
								fontSize: 15,
							},
							{
								text: "\n(Employee's Full Name)\n\n",
								fontSize: 11,
							},
							{
								text: 'School Of Technology\n',
								decoration: 'underline',
								fontSize: 15,
							},
							{
								text: '(Department)\n \n',
								fontSize: 11,
							},
							{
								text: '265 CTB or 230 SNLB\n',
								decoration: 'underline',
								fontSize: 15,
							},
							{
								text: '(Room and Building)\n \n',
								fontSize: 11,
							},
						],
					},
					{
						width: '50%',
						style: 'subfield',
						text: [
							/*
                         Net ID
                         */
							{
								text: cur.login,
								decoration: 'underline',
								fontSize: 15,
							},
							{
								text: "\n(Employee's Net ID)",
								fontSize: 11,
							},
						],
					},
				],
			},
			'\n \n',
			{
				style: 'maintext',
				text: [
					'I am an employee at the office listed above, and understand that by virtue of my employment ',
					'with Brigham Young University, I may have access to records which contain individually ',
					'identifiable information, the disclosure of which is prohibited by the Family Educational Rights ',
					'and Privacy Act (FERPA) of 1974. I acknowledge that I fully understand that the intentional ',
					'disclosure by me of this information to any unauthorized person could subject me to criminal and ',
					'civil penalties imposed by law. I also acknowledge that I will only access the records I have a ',
					'legitimate need to view in order to fulfill my university assignment. I further acknowledge that ',
					'willful or unauthorized access or disclosure violates policies of Brigham Young University, and ' +
						'could constitute just cause for disciplinary action including termination of my employment ' +
						'regardless of whether criminal or civil penalties are imposed.',
				],
			},
			'\n\n\n\n',
			{
				columns: [
					{
						// auto-sized columns have their widths based on their content
						width: '50%',
						style: 'subfield',

						text: [
							/*
                         Employee signature AKA full name
                         */
							{
								text: $('#fullName').val(),
								decoration: 'underline',
								fontSize: 15,
							},
							{
								text: '\n(Digitally Signed By)\n \n',
								fontSize: 11,
							},
						],
					},
					{
						width: '50%',
						style: 'subfield',

						text: [
							/*
                         Today's Date
                         */
							{
								text: new Date().localeFormat(),
								decoration: 'underline',
								fontSize: 15,
							},
							{
								text: '\n(Date)\n',
								fontSize: 11,
							},
						],
					},
				],
			},
			'\n\n\n\n',
			{
				text:
					'Please Note: You must watch the FERPA Training Video (a brief presentation about maintaining ' +
					'confidentiality of student records and information, entitled “FERPA: Handling Student \n' +
					'Educational Records”) before you will be given access to such electronic or hard copy ' +
					'information.' +
					'\n\n\n\n',
				style: 'maintext',
			},
			{
				columns: [
					{
						style: 'initials',
						width: '50%',
						text: ['I have watched the FERPA Training Video: \n\n'],
					},
					{
						style: 'initials',
						width: '15%',
						text: [
							/*
                         Initials
                         */
							{
								text: cur.initials,
								fontSize: 15,
								alignment: 'center',
								decoration: 'underline',
							},
							{
								text: '\n(initial)',
								fontSize: 11,
								alignment: 'center',
							},
						],
					},
				],
			},
		],
		styles: {
			header: {
				fontSize: 18,
				bold: true,
				alignment: 'center',
			},
			subheader: {
				fontSize: 12,
				alignment: 'center',
				italics: true,
			},
			subfield: {
				fontSize: 12,
				alignment: 'center',
			},
			quote: {
				italics: true,
			},
			small: {
				fontSize: 8,
			},
			maintext: {
				fontSize: 12,
			},
			initials: {
				fontSize: 12,
				alignment: 'right',
			},
		},
	};
	var doc = pdfMake.createPdf(dd).getBuffer(b => {
		var utf8 = new Uint8Array(b);
		saveFormPdfToServer(utf8.buffer, folderName, dt + cur.login + '.pdf');
	});
	function saveFormPdfToServer(pdfArrayBuffer, folderName, fileName) {
		return $.ajax({
			url: `../_api/SP.AppContextSite(@target)/web/getfolderbyserverrelativeurl('${archiveLibraryUrl}/${folderName}')/files/add(overwrite=true,url='${fileName}')?@target='${hostweburl}'`,
			type: 'POST',
			processData: false,
			headers: {
				accept: 'application/json; odata=verbose',
				'X-RequestDigest': jQuery('#__REQUESTDIGEST').val(),
				contentType: 'application/json; odata=verbose',
			},
			data: pdfArrayBuffer,
			success: function() {
                if (!alertUser()) {
                    return;                    
                }
                window.close();
			}
		});
	}
}

function closeWindow() {
    window.close();
}
function alertUser() {                                                                        
    window.alert('Your form uploaded successfully');
}
