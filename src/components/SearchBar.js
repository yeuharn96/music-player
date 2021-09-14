import React, { PureComponent } from 'react'

class SearchBar extends PureComponent {
    constructor(props) {
        super(props);

        this.txtRef = React.createRef();
        this.btnRef = React.createRef();
        this.state = { search: '' };
    }

    handleEnterKeyDown = (event) => {
        if (event.code === "Enter" || event.code === "NumpadEnter") {
            this.handleClickSearch();
        }
    }

    handleClickSearch = () => {
        const searchText = this.txtRef.current.value;
        //console.log(searchText);
        this.setState({ search: searchText });
        this.props.searchVideo(searchText);
    }

    render() {
        return (
            <div className="w-75 input-group text-center mx-auto my-2">
                <input type="text" ref={this.txtRef}
                    className="form-control"
                    value={this.props.search}
                    placeholder="Search"
                    onKeyDown={this.handleEnterKeyDown} />
                <button type="button" className="btn btn-primary" onClick={this.handleClickSearch}>Search</button>
            </div>
        );
    }
}

export default SearchBar;