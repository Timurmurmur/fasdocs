import { connect } from "react-redux";
import { TDispatchProps, TStateProps, Navigation, Route } from "../../common/types";
import { Dispatch } from "redux";
import { Action, State } from "../../../App";
import { IDocViewProps, DocView, DocViewSearch } from "./DocViewSearch";
import { loadDocumentStart } from "./actions";
import { downloadDocumentStart } from "../../Components/Download/actions";

type StateProps = TStateProps<IDocViewProps>;
type DispatchProps = TDispatchProps<IDocViewProps>;

export interface OwnProps {
    navigation: Navigation;
    route: Route;
}

const mapStateToProps = (state: State, ownProps: OwnProps): StateProps => ({
    pageStatus: state.docView.pageStatus,
    error: state.docView.error,
    navigation: ownProps.navigation,
    route: ownProps.route,
    document: state.docView.document,
    downloadStatus: state.download.downloadStatus,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => {
  return {
    loadDocumentContent: (document: any) => {
        return dispatch(loadDocumentStart(document))
    },
    downloadFile: (document: any) => {
      return dispatch(downloadDocumentStart(document));
    }
  };
};

export const DocViewSearchContainer = connect(mapStateToProps, mapDispatchToProps)(DocViewSearch);
