import { DisplayPublication } from "./DisplayPublication";
import { DisplaySideMenu } from "./DisplayLeftMenu";
import { DisplayRightMenu } from "./DisplayRightMenu";

export const DisplayBody = () => {
    return(
        <div className="publication-body">
            <DisplaySideMenu />
            <DisplayPublication />
            <DisplayRightMenu />
        </div>  
    );
};