import Content from "../components/Content";
const HomePage = (props) => {

    return(
        <Content user={props.user} setUser={props.setUser} aut={props.aut} category="womens-dresses"/>
    );
}
export default HomePage;