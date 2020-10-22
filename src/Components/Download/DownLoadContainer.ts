import { connect } from "react-redux";
import { TDispatchProps, TStateProps } from "../../common/types";
import { Dispatch } from "redux";
import { Action, State } from "../../../App";
import { Download, IDownloadProps } from "./Download";

interface OwnProps {
  navigation:any;
  route: any;
}

type StateProps = TStateProps<IDownloadProps, OwnProps>;

const mapStateToProps = (state: State, ownProps: OwnProps): StateProps => ({
    document: state.download.document,
    percent: state.download.process,
    downloadStatus: state.download.downloadStatus
});

export const DownloadContainer = connect(mapStateToProps, null)(Download);
