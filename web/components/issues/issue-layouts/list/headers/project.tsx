import { FC } from "react";
import { observer } from "mobx-react-lite";
// components
import { HeaderGroupByCard } from "./group-by-card";
// emoji helper
import { renderEmoji } from "helpers/emoji.helper";
import { EProjectStore } from "store/command-palette.store";
import { IIssue } from "types";

export interface IProjectHeader {
  column_id: string;
  column_value: any;
  issues_count: number;
  disableIssueCreation?: boolean;
  currentStore: EProjectStore;
  addIssuesToView?: (issueIds: string[]) => Promise<IIssue>;
}

const Icon = ({ emoji }: any) => <div className="w-6 h-6">{renderEmoji(emoji)}</div>;

export const ProjectHeader: FC<IProjectHeader> = observer((props) => {
  const { column_value, issues_count, disableIssueCreation, currentStore, addIssuesToView } = props;

  const project = column_value ?? null;

  return (
    <>
      {project && (
        <HeaderGroupByCard
          icon={<Icon emoji={project?.emoji} />}
          title={project?.name || ""}
          count={issues_count}
          issuePayload={{ project: project?.id ?? "" }}
          disableIssueCreation={disableIssueCreation}
          currentStore={currentStore}
          addIssuesToView={addIssuesToView}
        />
      )}
    </>
  );
});
