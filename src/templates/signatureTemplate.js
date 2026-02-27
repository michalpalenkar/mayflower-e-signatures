export const generateSignatureHTML = (data) => {
  const { name, surname, tel, mail, position } = data;

return `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0; padding:0; border-collapse:collapse;">
  <tr>
    <td align="left" style="margin:0; padding:0;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="454" style="width:454px; border-collapse:collapse; font-family:Arial, sans-serif;" bgcolor="#FFFFFF">
        <tr>
          <td style="padding:0; margin:0; background-color:#FFFFFF;" bgcolor="#FFFFFF">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="454" style="width:454px; border-collapse:collapse;">
              <tr>
                <td style="padding:0 0 16px 0; margin:0;">
                  <img src="https://mayflower.hoere.eu/email_signature/2026/mayflower_logo.png"
                       alt="Mayflower"
                       width="150" height="148"
                       style="display:block; width:150px; height:148px; border:0; outline:none; text-decoration:none;" />
                </td>
              </tr>
            </table>
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="454" style="width:454px; border-collapse:collapse;">
              <tr>
                <td style="padding:0 0 0 28px; margin:0;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="424" style="width:424px; border-collapse:collapse;">

                    <tr>
                      <td style="font-family:Arial, sans-serif; font-size:18px; font-weight:bold; color:#111111; line-height:22px; padding:0 0 8px 0; margin:0;">${name} ${surname}</td>
                    </tr>
                    <tr>
                      <td style="font-family:Arial, sans-serif; font-size:12px; font-weight:normal; color:#111111; line-height:16px; text-transform:uppercase; padding:0 0 12px 0; margin:0;">${position}</td>
                    </tr>
                    <tr>
                      <td style="font-family:Arial, sans-serif; font-size:12px; color:#111111; line-height:17px; padding:0 0 4px 0; margin:0;">
                        <a href="mailto:${mail}" style="font-family:Arial, sans-serif; color:#111111; text-decoration:underline;">${mail}</a>
                      </td>
                    </tr>
                    <tr>
                      <td style="font-family:Arial, sans-serif; font-size:12px; color:#111111; line-height:17px; padding:0 0 12px 0; margin:0;">
                        <a href="tel:${tel.replace(/\s/g, '')}" style="font-family:Arial, sans-serif; color:#111111; text-decoration:underline;">${tel}</a>
                      </td>
                    </tr>
                    <tr>
                      <td style="font-family:Arial, sans-serif; font-size:12px; font-weight:bold; color:#111111; line-height:17px; padding:0 0 16px 0; margin:0;">
                        <a href="https://mayflower.sk" style="font-family:Arial, sans-serif; color:#111111; text-decoration:none;">
                          mayflower.sk
                        </a>
                        <span style="color:#111111; padding:0 6px;">&#8226;</span>
                        <a href="https://ocspektrum.sk" style="font-family:Arial, sans-serif; color:#111111; text-decoration:none;">
                          ocspektrum.sk
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:0 0 16px 0; margin:0;">
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                          <tr>
                            <td style="padding:0 16px 0 0; margin:0; vertical-align:top;">
                              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                                <tr>
                                  <td style="vertical-align:top; padding:0 12px 0 0; margin:0;">
                                    <img src="https://mayflower.hoere.eu/email_signature/2026/award_badge.png"
                                         alt="CIJ Award"
                                         width="34" height="41"
                                         style="display:block; margin-top: 0 !important; margin-bottom: 0 !important; width:34px; height:41px; border:0; outline:none; text-decoration:none;" />
                                  </td>
                                  <td style="vertical-align:top; padding:0; margin:0;">
                                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                                      <tr>
                                        <td style="font-family:Arial, sans-serif; font-size:11px; font-weight:bold; color:#7C3F98; line-height:14px; text-transform:uppercase; padding:0 0 2px 0; margin:0;">
                                          BEST RETAIL DEVELOPMENT
                                        </td>
                                      </tr>
                                      <tr>
                                        <td style="font-family:Arial, sans-serif; font-size:11px; font-weight:bold; color:#111111; line-height:14px; text-transform:uppercase; padding:0 0 2px 0; margin:0; white-space:nowrap;">
                                          OF THE YEAR - SPEKTRUM RK
                                        </td>
                                      </tr>
                                      <tr>
                                        <td style="font-family:Arial, sans-serif; font-size:10px; font-weight:normal; color:#111111; line-height:12px; padding:0; margin:0;">
                                          <a href="https://awards.cijeurope.com/sk" style="font-family:Arial, sans-serif; color:#111111; text-decoration:none;">
                                            https://awards.cijeurope.com/sk
                                          </a>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                            <td style="padding:0; margin:0; vertical-align:top;">
                              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                                <tr>
                                  <td style="vertical-align:top; padding:0 12px 0 0; margin:0;">
                                    <img src="https://mayflower.hoere.eu/email_signature/2026/award_badge.png"
                                         alt="CIJ Award"
                                         width="34" height="41"
                                         style="display:block; width:34px; height:41px; margin-top: 0 !important; margin-bottom: 0 !important; border:0; outline:none; text-decoration:none;" />
                                  </td>
                                  <td style="vertical-align:top; padding:0; margin:0;">
                                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                                      <tr>
                                        <td style="font-family:Arial, sans-serif; font-size:11px; font-weight:bold; color:#7C3F98; line-height:14px; text-transform:uppercase; padding:0 0 2px 0; margin:0;">
                                          LEADERSHIP
                                        </td>
                                      </tr>
                                      <tr>
                                        <td style="font-family:Arial, sans-serif; font-size:11px; font-weight:bold; color:#111111; line-height:14px; text-transform:uppercase; padding:0 0 2px 0; margin:0;">
                                          OF THE YEAR
                                        </td>
                                      </tr>
                                      <tr>
                                        <td style="font-family:Arial, sans-serif; font-size:10px; font-weight:normal; color:#111111; line-height:12px; padding:0; margin:0;">
                                          <a href="https://awards.cijeurope.com/sk" style="font-family:Arial, sans-serif; color:#111111; text-decoration:none;">
                                            https://awards.cijeurope.com/sk
                                          </a>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>

                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:0 0 16px 0; margin:0;">
                        <a href="https://ocspektrum.sk" style="display:block; text-decoration:none; border:0;">
                          <img src="https://mayflower.hoere.eu/email_signature/2026/oc_spektrum_banner.png"
                               alt="Spektrum Banner"
                               width="424" height="96"
                               style="display:block; width:424px; height:auto; max-width:424px; border:0; outline:none; text-decoration:none;" />
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td style="font-family:Arial, sans-serif; font-size:12px; font-weight:normal; color:#999999; line-height:15px; padding:0; margin:0;">
                        The information in this email is confidential and solely for the use of the intended recipient(s). If you receive this email in error, please notify the sender and delete the email from your system immediately. In such circumstances, you must not make any use of the email or its contents. Mayflower Group s.r.o.
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
`};