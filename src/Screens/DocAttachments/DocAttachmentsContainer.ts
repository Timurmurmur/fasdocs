import { connect } from "react-redux";
import { TDispatchProps, TStateProps } from "../../common/types";
import { Dispatch } from "redux";
import { Action, State } from "../../../App";
import { DocAttachments, IDocAttachmentsProps } from "./DocAttachments";
import { downloadDocumentStart } from "../../Components/Download/actions";

interface OwnProps {
  navigation:any;
  route: any;
}

type StateProps = TStateProps<IDocAttachmentsProps, OwnProps>;
type DispatchProps = TDispatchProps<IDocAttachmentsProps, OwnProps>;

const mapStateToProps = (state: State, ownProps: OwnProps): StateProps => ({
  downloadStatus: state.download.downloadStatus,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => {
  return {
    downloadFile: (document: any) => {
        return dispatch(downloadDocumentStart(document))
    }
  };
};

export const DocAttachmentsContainer = connect(mapStateToProps, mapDispatchToProps)(DocAttachments);
