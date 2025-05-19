"use client"
import Head from "next/head";
import CustomButton from '@/components/general/Button'
import { THEME } from '@/theme'
import { Flex, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React from 'react'

interface Props { }

function Privacy(props: Props) {
    const { } = props

    const router = useRouter()

    return (
        <>
            <Head>
                <title>Privacy Policy | ChaseScroll</title>
                <meta name="description" content="Transforming event management across Africa by empowering young creators and entrepreneurs—providing a platform to showcase their talents, highlight their skills, and connect them to real business opportunities." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Flex w={"full"} flexDir={"column"} color={"#1E1E1E"} py={["8", "8", "8", "20"]} px={["6", "6", "6", "20"]} >
                <Flex justifyContent={"end"} mb={"4"}  >

                    <svg onClick={() => router.back()} role="button" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="close">
                            <path id="Vector" d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z" fill="black" />
                        </g>
                    </svg>
                </Flex>
                <Text fontSize={"20px"} fontWeight={"bold"} textAlign={"center"} >PRIVACY POLICY</Text><br />
                [CHASESCROLL LLC] (“we” or “us” or “our”) respects the privacy of our users (“user” or “you”). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our web or mobile application (the “Application”). Please read this Privacy Policy carefully. IF YOU DO NOT AGREE WITH THE TERMS OF THIS PRIVACY POLICY, PLEASE DO NOT ACCESS THE APPLICATION. We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the “Last updated” date of this Privacy Policy. You are encouraged to periodically review this Privacy Policy to stay informed of updates. You will be deemed to have been made aware of, will be subject to, and will be deemed to have accepted the changes in any revised Privacy Policy by your continued use of the Application after the date such revised Privacy Policy is posted. This Privacy Policy does not apply to the third-party online/mobile store from which you install the Application or make payments, including any in-game virtual items, which may also collect and use data about you. We are not responsible for any of the data collected by any such third party.
                <br /><br />
                <Text fontWeight={"bold"} fontSize={"18px"} >Collection of your information</Text>
                <br />
                We may collect information about you in a variety of ways. The information we may collect via the Application depends on the content and materials you use, and includes: Personal Data Demographic and other personally identifiable information (such as your name and email address) that you voluntarily give to us when choosing to participate in various activities related to the Application, such as chat, posting messages in comment sections or in our forums, liking posts, sending feedback, purchasing ticket(s) and responding to surveys. If you choose to share data about yourself via your profile, online chat, or other interactive areas of the Application, please be advised that all data you disclose in these areas is public and your data will be accessible to anyone who accesses the Application.
                <br /><br />
                Derivative Data Information our servers automatically collect when you access the Application, such as your native actions that are integral to the Application, including liking, re-blogging, or replying to a post, as well as other interactions with the Application and other users via server log files. Financial Data Financial information, such as data related to your payment method (e.g. valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the Application. [We store only very limited, if any, financial information that we collect. Otherwise, all financial information is stored by our payment processor, [Paystack Payments,] [Stripe,] and you are encouraged to review their privacy policy and contact them directly for responses to your questions. Data from Social Networks User information from social networking sites, such as [Apple's Game Center, Facebook, Google+ Instagram, Pinterest, Twitter], including your name, your social network username, location, gender, birth date, email address, profile picture, and public data for contacts, if you connect your account to such social networks. This information may also include the contact information of anyone you invite to use and/or join the Application. Geo-Location Information We may request access or permission to and track location-based information from your mobile device, either continuously or while you are using the Application, to provide location-based services. If you wish to change our access or permissions, you may do so in your device's settings.
                <br /><br />
                Mobile Device Access We may request access or permission to certain features from your mobile device, including your mobile device's [Bluetooth, calendar, camera, contacts, microphone, reminders, sensors, SMS messages, social media accounts, storage,] and other features. If you wish to change our access or permissions, you may do so in your device's settings.
                <br /><br />
                Mobile Device Data Device information such as your mobile device ID number, model, and manufacturer, version of your operating system, phone number, country, location, and any other data you choose to provide.
                <br /><br />
                Push Notifications We may request to send you push notifications regarding your account or the Application. If you wish to opt-out from receiving these types of communications, you may turn them off in your device's settings.
                <br /><br />
                Third-Party Data Information from third parties, such as personal information or network friends, if you connect your account to the third party and grant the Application permission to access this information. Data from Contests, Giveaways, and Surveys Personal and other information you may provide when entering contests or giveaways and/or responding to surveys.
                <br /><br /><br />
                <Text fontWeight={"bold"} fontSize={"18px"} >USE OF YOUR INFORMATION</Text>
                <br />
                Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Application to:
                <br /><br />
                1. Administer sweepstakes, promotions, and contests.
                <br /><br />
                2. Assist law enforcement and respond to subpoena.
                <br /><br />
                3. Compile anonymous statistical data and analysis for use internally or with third parties.
                <br /><br />
                4. Create and manage your account.
                <br /><br />
                5. Deliver targeted advertising, coupons, newsletters, and other information regarding promotions and the Application to you.
                <br /><br />
                6. Email you regarding your account or order.
                <br /><br />
                7. Enable user-to-user communications.
                <br /><br />
                8. Fulfill and manage purchases, orders, payments, and other transactions related to the Application.
                <br /><br />
                9. Generate a personal profile about you to make future visits to the Application more personalized.
                <br /><br />
                10. Increase the efficiency and operation of the Application.
                <br /><br />
                11. Monitor and analyze usage and trends to improve your experience with the Application.
                <br /><br />
                12. Notify you of updates to the Application.
                <br /><br />
                13. Offer new products, services, mobile applications, and/or recommendations to you.
                <br /><br />
                14. Perform other business activities as needed.
                <br /><br />
                15.Prevent fraudulent transactions, monitor against theft, and protect against criminal activity.
                <br /><br />
                16. Process payments and refunds.
                <br /><br />
                17. Request feedback and contact you about your use of the Application. 18. Resolve disputes and troubleshoot problems.
                <br /><br />
                19. Respond to product and customer service requests. 20. Send you a newsletter. 21. Solicit support for the Application.
                <br /><br />
                22. [Other]
                <br /><br />
                <Text fontWeight={"bold"} fontSize={"18px"} >DISCLOSURE OF YOUR INFORMATION</Text><br /><br />
                We may share information we have collected about you in certain situations. Your information may be disclosed as follows:

                <br /><br />
                <Text fontSize={"18px"} fontWeight={"bold"} textDecoration={"underline"} >By Law or to Protect Rights</Text><br />
                If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation. This includes exchanging information with other entities for fraud protection and credit risk reduction.

                <br /><br />
                <Text fontSize={"18px"} fontWeight={"bold"} textDecoration={"underline"} >Third-Party Service Providers</Text><br />
                We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.

                <br /><br />
                <Text fontSize={"18px"} fontWeight={"bold"} textDecoration={"underline"} >Marketing Communications</Text><br />
                With your consent, or with an opportunity for you to withdraw consent, we may share your information with third parties for marketing purposes, as permitted by law. Interactions with Other Users If you interact with other users of the Application, those users may see your name, profile photo, and descriptions of your activity, including sending invitations to other users or groups, chatting with other users, liking posts, following events.

                <br /><br />
                <Text fontSize={"18px"} fontWeight={"bold"} textDecoration={"underline"} >Online Postings</Text><br />
                When you post comments, contributions or other content to the Applications, your posts may be viewed by all users and may be publicly distributed outside the Application in perpetuity Third-Party Advertisers We may use third-party advertising companies to serve ads when you visit the Application. These companies may use information about your visits to the Application and other websites that are contained in web cookies to provide advertisements about goods and services of interest to you.

                <br /><br />
                <Text fontSize={"18px"} fontWeight={"bold"} textDecoration={"underline"} >Affiliates</Text><br />
                We may share your information with our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include our parent company and any subsidiaries, joint venture partners or other companies that we control or that are under common control with us. Business Partners We may share your information with our business partners to offer you certain products, services or promotions.

                <br /><br />
                <Text fontSize={"18px"} fontWeight={"bold"} textDecoration={"underline"} >SECURITY OF YOUR INFORMATION</Text><br />
                We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse. Any information disclosed online is vulnerable to interception and misuse by unauthorized parties. Therefore, we cannot guarantee complete security if you provide personal information.

                <br /><br />
                <Text fontSize={"18px"} fontWeight={"bold"} textDecoration={"underline"} >POLICY FOR CHILDREN</Text><br />
                We do not knowingly solicit information from or market to children under the age of 13. If you become aware of any data, we have collected from children under age 13, please contact us using the contact information provided in our contact page. CONTROLS FOR DO-NOT-TRACK FEATURES Most web browsers and some mobile operating systems [and our mobile applications] include a Do-Not-Track (“DNT”) feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. No uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this Privacy Policy.

                <br /><br />
                <Text fontSize={"18px"} fontWeight={"bold"} textDecoration={"underline"} >OPTIONS REGARDING YOUR INFORMATION   [Account Information]</Text><br />
                You may at any time review or update the information in your account or delete your account by: • Logging into your account settings and edit your account • Contacting us using the contact information provided on our contact page. • On the setting page, click on the delete account option to delete your account completely. Upon your request to delete your account, your account and information from our active database will be deleted automatically. However, information may be retained in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our Terms of Use and/or comply with legal requirements.

                <br /><br />
                <Text fontSize={"18px"} fontWeight={"bold"} textDecoration={"underline"} >Emails and Communications If you no longer wish to receive correspondence, emails, or other communications from us, you may opt-out by:</Text><br />
                Noting your preferences at the time you register your account with the Application • Logging into your account settings and updating your preferences. • Contacting us using the contact information provided below If you no longer wish to receive correspondence, emails, or other communications from third parties, you are responsible for contacting the third party directly.

                <br /><br />
                <Text fontWeight={"bold"} fontSize={"18px"} >CALIFORNIA PRIVACY RIGHTS</Text><br />
                California Civil Code Section 1798.83, also known as the “Shine The Light” law, permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes and the names and addresses of all third parties with which we shared personal information in the immediately preceding calendar year. If you are a California resident and would like to make such a request, please submit your request in writing to us using the contact information provided below. If you are under 18 years of age, reside in California, and have a registered account with the Application, you have the right to request removal of unwanted data that you publicly post on the Application. To request removal of such data, please contact us using the contact information provided below, and include the email address associated with your account and a statement that you reside in California. We will make sure the data is not publicly displayed on the Application, but please be aware that the data may not be completely or comprehensively removed from our systems.

                <br /><br />
                <Text fontWeight={"bold"} fontSize={"18px"} >CONTACT US</Text><br />
                If you have questions or comments about this Privacy Policy, please contact us at: [Email: info@chasescroll.com]
                {/* <div className=" w-full flex justify-end mt-8 " >
                    <button onClick={() => router.push("/home")} className=" w-full lg:w-[225px] h-[55px] border border-[#5D70F9] bg-[#D0D4EB45] rounded text-[#3C41F0] font-semibold text-lg " >Back </button>
                </div> */}
                <CustomButton onClick={() => router.push("/home")} text={"Back"} mt={"8"} width={["full", "full", "152px"]} backgroundColor={["white", "white", THEME?.COLORS?.chasescrollButtonBlue + ""]} height={"48px"} borderWidth={"1px"} borderColor={THEME?.COLORS?.chasescrollBlue} color={[THEME?.COLORS?.chasescrollBlue, THEME?.COLORS?.chasescrollBlue, "white"]} borderRadius={"8px"} />
            </Flex>
        </>
    )
}

export default Privacy
