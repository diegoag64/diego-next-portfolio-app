import BaseLayout from "@/components/layout/BaseLayout";
import BasePage from "@/components/BasePage";
import { Row, Col } from 'reactstrap';
import { useUser } from '@auth0/nextjs-auth0';
import { isAuthorized } from '@/hoc/withAuth';
import { useEffect } from "react";

const About = () => {

    useEffect(() => {
        return () => {
            window.__isAboutLoaded = true;
        }
    })

    const createFadeInClass = () => {
        if(typeof window !== 'undefined'){
            return window.__isAboutLoaded ? '' : 'fadein';
        }

        return 'fadein';
    }

    return(
        <BaseLayout>
            <BasePage title="About Me - Diego Arias" className="about-page">
                <Row className="mt-5">
                    <Col md="6">
                        <div className="left-side">
                        <h1 className={`title ${createFadeInClass()}`}>Hello, Welcome</h1>
                        <h4 className={`subtitle ${createFadeInClass()}`}>To About Page</h4>
                        <p className={`subsubTitle ${createFadeInClass()}`}>Feel free to read a short description about me.</p>
                        </div>
                    </Col>
                    <Col md="6">
                        <div className={`${createFadeInClass()}`}>
                        <p>My name is Diego Arias and I am an experienced website developer. </p>
                        <p>
                        My webdev story began on 2014 at Brilliant Directories, starting out working on Marketing/Design because I
                        had some previous experience with Photoshop, I quickly started getting curious watching my co-workers
                        programming. I was able to pick up HTML/CSS/JS pretty quickly and then started working on projects 
                        involving PHP and MySQL which lead me to transition into the dev team. During the 7 years working there I was able to improve my coding skills, team-work, problem solving skills, etc...
                        </p>
                        <p>
                        Currently I am trying to transition into React and focus more on front-end development. I have learned many things since
                        I started programming but I feel like a "Jack of all trades, master of none", which is not a bad thing but I would rather master
                        something.
                        </p>
                        </div>
                    </Col>
                </Row>
            </BasePage>
        </BaseLayout>
    )
}

export default About;