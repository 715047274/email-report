const asciichart = require('asciichart');
const path = require('path');
const fs = require('fs');
const sendEmail = require('sendmail')();

const createAsciiChart = () => {
    const data = [65, 59, 80, 81, 56, 55, 40];
    const chart = asciichart.plot(data, { height: 10 });
    const htmlContent = `<pre>${chart}</pre>`;
    fs.writeFileSync(path.join(__dirname, 'chart.html'), htmlContent);
    console.log('ASCII Chart created');
};

createAsciiChart();


const sendChartEmail = ()=>{
    const chartPath = path.join(__dirname, 'chart.html');
    const chartContent = fs.readFileSync(chartPath, 'utf-8');

    const mailOptions = {
        from: 'autotest@dayforce.com',
        to: 'k.zhang@ceridian.com',
        subject: 'ASCII Chart Email',
        html: `Here is the chart you requested`
    };
    sendEmail({...mailOptions}, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email sent: ' + info.response);
    });
};

if (fs.existsSync(path.join(__dirname, 'chart.html'))) {
    sendChartEmail();
} else {
    console.log('ASCII chart not found. Please run createAsciiChart.js first.');
}


// sendEmail({
//     from: 'no-reply@yourdomain.com',
//     to: 'k.zhang@ceridian.com',
//     subject: 'test sendmail',
//     html: '<!doctype html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><title></title><!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]--><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style type="text/css">#outlook a { padding:0; }\n' +
//         '          body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }\n' +
//         '          table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }\n' +
//         '          img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }\n' +
//         '          p { display:block;margin:13px 0; }</style><!--[if mso]>\n' +
//         '        <noscript>\n' +
//         '        <xml>\n' +
//         '        <o:OfficeDocumentSettings>\n' +
//         '          <o:AllowPNG/>\n' +
//         '          <o:PixelsPerInch>96</o:PixelsPerInch>\n' +
//         '        </o:OfficeDocumentSettings>\n' +
//         '        </xml>\n' +
//         '        </noscript>\n' +
//         '        <![endif]--><!--[if lte mso 11]>\n' +
//         '        <style type="text/css">\n' +
//         '          .mj-outlook-group-fix { width:100% !important; }\n' +
//         '        </style>\n' +
//         '        <![endif]--><style type="text/css">@media only screen and (min-width:480px) {\n' +
//         '        .mj-column-per-100 { width:100% !important; max-width: 100%; }\n' +
//         '      }</style><style media="screen and (min-width:480px)">.moz-text-html .mj-column-per-100 { width:100% !important; max-width: 100%; }</style><style type="text/css">@media only screen and (max-width:480px) {\n' +
//         '      table.mj-full-width-mobile { width: 100% !important; }\n' +
//         '      td.mj-full-width-mobile { width: auto !important; }\n' +
//         '    }</style></head><body style="word-spacing:normal;background-color:#F4F4F4;"><div style="background-color:#F4F4F4;"><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#000000" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="background:#000000;background-color:#000000;margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#000000;background-color:#000000;width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tbody><tr><td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:30px;word-break:break-word;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"><tbody><tr><td style="width:180px;"><img height="auto" src="http://5vph.mj.am/img/5vph/b/1g86w/0g67t.png" style="border:none;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="180"></td></tr></tbody></table></td></tr><tr><td align="left" style="font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:0px;word-break:break-word;"><div style="font-family:Arial, sans-serif;font-size:13px;line-height:22px;text-align:left;color:#55575d;"><p style="line-height: 18px; margin: 10px 0; text-align: center;font-size:14px;color:#ffffff;font-family:\'Times New Roman\',Helvetica,Arial,sans-serif">WOMEN&nbsp; &nbsp; &nbsp; &nbsp;| &nbsp; &nbsp; &nbsp; MEN&nbsp; &nbsp; &nbsp; &nbsp;| &nbsp; &nbsp; &nbsp; KIDS</p></div></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#000000" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="background:#000000;background-color:#000000;margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#000000;background-color:#000000;width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:0 0 0 0;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tbody><tr><td align="center" style="font-size:0px;padding:0px 25px;padding-right:0px;padding-bottom:0px;padding-left:0px;word-break:break-word;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"><tbody><tr><td style="width:600px;"><img height="auto" src="http://5vph.mj.am/img/5vph/b/1g86w/0696u.jpeg" style="border:none;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="600"></td></tr></tbody></table></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#000000" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="background:#000000;background-color:#000000;margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#000000;background-color:#000000;width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:0 0 0 0;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tbody><tr><td align="left" style="font-size:0px;padding:10px 25px;padding-top:25px;padding-bottom:5px;word-break:break-word;"><div style="font-family:Arial, sans-serif;font-size:13px;line-height:22px;text-align:left;color:#55575d;"><p style="line-height: 60px; text-align: center; margin: 10px 0;font-size:55px;color:#fcfcfc;font-family:\'Times New Roman\',Helvetica,Arial,sans-serif"><b>Black Friday</b></p></div></td></tr><tr><td align="left" style="font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:20px;word-break:break-word;"><div style="font-family:Arial, sans-serif;font-size:13px;line-height:22px;text-align:left;color:#55575d;"><p style="line-height: 30px; text-align: center; margin: 10px 0;color:#f5f5f5;font-size:25px;font-family:\'Times New Roman\',Helvetica,Arial,sans-serif"><b>Take an&nbsp; extra 50% off</b><br><span style="color:#ffffff;font-size:18px;font-family:\'Times New Roman\',Helvetica,Arial,sans-serif">Use code SALEONSALE* at checkout</span></p></div></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#000000" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="background:#000000;background-color:#000000;margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#000000;background-color:#000000;width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:0 0 0 0;padding-bottom:40px;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tbody><tr><td align="center" vertical-align="middle" style="font-size:0px;padding:10px 25px;padding-bottom:30px;word-break:break-word;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;"><tr><td align="center" bgcolor="#ffffff" role="presentation" style="border:none;border-radius:3px;cursor:auto;mso-padding-alt:10px 25px;background:#ffffff;" valign="middle"><p style="display:inline-block;background:#ffffff;color:#ffffff;font-family:Times New Roman, Helvetica, Arial, sans-serif;font-size:18px;font-weight:normal;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:10px 25px;mso-padding-alt:0px;border-radius:3px;"><span style="color:#212020">Shop Now</span></p></td></tr></table></td></tr><tr><td align="left" style="font-size:0px;padding:10px 25px;padding-top:5px;padding-bottom:0px;word-break:break-word;"><div style="font-family:Arial, sans-serif;font-size:13px;line-height:22px;text-align:left;color:#55575d;"><p style="line-height: 16px; text-align: center; margin: 10px 0;font-size:12px;color:#ffffff;font-family:\'Times New Roman\',Helvetica,Arial,sans-serif">* Offer valid on Allura purchases on 17/29/11 at 11:59 pm. No price adjustments on previous&nbsp;<br><span style="color:#ffffff;font-family:\'Times New Roman\',Helvetica,Arial,sans-serif">purchases, offer limited to stock. Cannot be combined with any offer or promotion other than free.</span></p></div></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></div></body></html>',
// }, function(err, reply) {
//     console.log(err && err.stack);
//     console.dir(reply);
// });