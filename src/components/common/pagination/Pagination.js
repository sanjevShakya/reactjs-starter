import React, { Component } from 'react';
import _ from 'lodash';

const PageButtonComponent = props => <button {...props}>{props.children}</button>;

class Pagination extends Component {
  state = { visiblePages: [] };

  componentWillReceiveProps(nextProps) {
    if (this.props.pages !== nextProps.pages) {
      this.setState({
        visiblePages: this.getVisiblePages(nextProps.page, nextProps.pages.length, nextProps.visiblePageCount),
      });
    }
  }

  pageButtonStyle = {
    padding: '2px 10px',
    border: '1px solid #erf0f7',
    borderRadius: '4px',
    marginRight: '5px',
    color: '#555555',
    background: '#ffffff',
    fontSize: '0.75rem',
    color: '#333333',
  };

  disablButtonStyle = {
    cursor: 'not-allowed',
  };

  pageAnchorStyle = {
    padding: '0 10px',
    color: '#333333',
  };

  getVisiblePages = (page, total, visiblePageCount) => {
    let visiblePages = [];

    if (total <= visiblePageCount) {
      visiblePages = _.range(1, total + 1);
    } else {
      const offset = Math.floor(visiblePageCount / 2);
      if (page % visiblePageCount >= 0 && page > visiblePageCount - 1 && page + 2 < total) {
        if (visiblePageCount % 2 == 0) {
          visiblePages = _.range(page - offset, page + offset);
        } else {
          visiblePages = _.range(page - offset, page + offset + 1);
        }
      } else if (page % visiblePageCount >= 0 && page > visiblePageCount - 1 && page + 2 >= total) {
        visiblePages = _.range(total - visiblePageCount + 1, total + 1);
      } else {
        visiblePages = _.range(1, visiblePageCount + 2);
      }
    }

    visiblePages[0] = 1;
    visiblePages[visiblePages.length - 1] = total;

    return visiblePages;
  };

  render() {
    const { pages, onPageChange, page } = this.props;
    const { visiblePages } = this.state;

    return (
      <React.Fragment>
        <PageButtonComponent
          style={{ ...this.pageButtonStyle, cursor: page === 1 ? 'not-allowed' : 'auto' }}
          onClick={() => onPageChange(1)}
          disabled={page === 1}
        >
          First
        </PageButtonComponent>

        <PageButtonComponent
          onClick={() => onPageChange(page - 1)}
          style={{ ...this.pageButtonStyle, cursor: page === 1 ? 'not-allowed' : 'auto' }}
          disabled={page === 1}
        >
          Previous
        </PageButtonComponent>

        {visiblePages.map((pageNumber, index, array) => (
          <PageButtonComponent
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            style={{
              ...this.pageButtonStyle,
              cursor: array[index - 1] + 2 <= pageNumber ? 'not-allowed' : 'auto',
              backgroundColor: page === pageNumber ? '#999999' : '#ffffff',
            }}
            disabled={array[index - 1] + 2 <= pageNumber}
          >
            {array[index - 1] + 2 <= pageNumber ? `...` : pageNumber}
          </PageButtonComponent>
        ))}

        <PageButtonComponent
          onClick={() => onPageChange(page + 1)}
          style={{ ...this.pageButtonStyle, cursor: page === pages.length ? 'not-allowed' : 'auto' }}
          disabled={page === pages.length}
        >
          Next
        </PageButtonComponent>

        <PageButtonComponent
          style={{ ...this.pageButtonStyle, cursor: page === pages.length ? 'not-allowed' : 'auto' }}
          onClick={() => onPageChange(pages.length)}
          disabled={page === pages.length}
        >
          Last
        </PageButtonComponent>
      </React.Fragment>
    );
  }
}

export default Pagination;
