import React, { Component } from "react";

class ErrorBoundary extends Component{
    constructor(props){
        super(props);

        this.state = { hasError: false, errorMessage: '' };
    }

    static getDerivedStateFromError(error){
        return { hasError: true, errorMessage: error.message };
    }

    render(){
        if(this.state.hasError){
            return (
                <>
                    <h1>😢 Oops!</h1>
                    <h3 style={{color: "red"}}>{this.state.errorMessage}</h3>
                    <h3>An error has occurred, please contact system administrator for further support.</h3>
                </>
            )
        }
        else{
            return this.props.children;
        }
    }
}

export default ErrorBoundary;