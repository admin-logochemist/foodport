import React from 'react'
import "./TermsAndConditions.css"
import Footer from './Footer'

export default function TermsAndConditions() {
  return (
    <div>
      <div className="TermsAndCondition__main">
        <div className="txt">
          <h1 className="font__terms">TERMS AND CONDITIONS</h1>
        </div>
      </div>
      <br/>
      <div className="terms__txt">
        <h2>Published: 2021</h2>
        <h1>TERMS OF USE</h1>
        <br/>
        <p className="paragraph">
        These Terms of Use (“<b style={{ color: 'black' }}>Terms</b>”) govern your use of the websites and mobile applications provided by foodport (or referred to as “<b style={{ color: 'black' }}>us</b>”) (collectively the “<b style={{ color: 'black' }}>Platforms</b>”). Please read these Terms carefully. By accessing and using the Platforms, you agree that you have read, understood and accepted the Terms including any additional terms and conditions and any policies referenced herein, available on the Platforms or available by hyperlink. If you do not agree or fall within the Terms, please do not use the Platforms.
        </p>
        <br/>
        <p className="paragraph">
        The Platforms may be used by (i) natural persons who have reached 18 years of age and (ii) corporate legal entities, e.g companies. Where applicable, these Terms shall be subject to country-specific provisions as set out herein. 
        </p>
        <br/>
        <p className="paragraph">
        Users below the age of 18 must obtain consent from parent(s) or legal guardian(s), who by accepting these Terms shall agree to take responsibility for your actions and any charges associated with your use of the Platforms and/or purchase of Goods. If you do not have consent from your parent(s) or legal guardian(s), you must stop using/accessing the Platforms immediately. 
        </p>
        <br/>
        <p className="paragraph">
        foodport reserves the right to change or modify these Terms (including our policies which are incorporated into these Terms) at any time. You are strongly recommended to read these Terms regularly. You will be deemed to have agreed to the amended Terms by your continued use of the Platforms following the date on which the amended Terms are posted.
        </p>
      </div>
      <Footer/>
      <div className="copyright__Terms">
        <h1>Copyright 2020.All rights reserved.</h1>
      </div>
    </div>
  );
}
