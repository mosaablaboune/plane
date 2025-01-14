import React from "react";
import { useRouter } from "next/router";
import { ChevronRight } from "lucide-react";
// components
import { Tooltip } from "@plane/ui";
// types
import { IIssue, IIssueDisplayProperties } from "types";

type Props = {
  issue: IIssue;
  expanded: boolean;
  handleToggleExpand: (issueId: string) => void;
  properties: IIssueDisplayProperties;
  quickActions: (issue: IIssue) => React.ReactNode;
  disableUserActions: boolean;
  nestingLevel: number;
};

export const IssueColumn: React.FC<Props> = ({
  issue,
  expanded,
  handleToggleExpand,
  properties,
  quickActions,
  disableUserActions,
  nestingLevel,
}) => {
  // router
  const router = useRouter();

  const handleIssuePeekOverview = (issue: IIssue) => {
    const { query } = router;

    router.push({
      pathname: router.pathname,
      query: { ...query, peekIssueId: issue?.id, peekProjectId: issue?.project },
    });
  };

  const paddingLeft = `${nestingLevel * 54}px`;

  return (
    <>
      <div className="group flex items-center w-[28rem] text-sm h-11 top-0 bg-custom-background-100 truncate border-b border-custom-border-100">
        {properties.key && (
          <div
            className="flex gap-1.5 px-4 pr-0 py-2.5 items-center min-w-min"
            style={issue.parent && nestingLevel !== 0 ? { paddingLeft } : {}}
          >
            <div className="relative flex items-center cursor-pointer text-xs text-center hover:text-custom-text-100">
              <span className="flex items-center justify-center font-medium opacity-100 group-hover:opacity-0 ">
                {issue.project_detail?.identifier}-{issue.sequence_id}
              </span>

              {!disableUserActions && (
                <div className="absolute top-0 left-2.5 opacity-0 group-hover:opacity-100">{quickActions(issue)}</div>
              )}
            </div>

            {issue.sub_issues_count > 0 && (
              <div className="h-6 w-6 flex justify-center items-center">
                <button
                  className="h-5 w-5 hover:bg-custom-background-90 hover:text-custom-text-100 rounded-sm cursor-pointer"
                  onClick={() => handleToggleExpand(issue.id)}
                >
                  <ChevronRight className={`h-3.5 w-3.5 ${expanded ? "rotate-90" : ""}`} />
                </button>
              </div>
            )}
          </div>
        )}
        <div className="w-full overflow-hidden">
          <Tooltip tooltipHeading="Title" tooltipContent={issue.name}>
            <div
              className="px-4 py-2.5 h-full w-full truncate text-custom-text-100 text-left cursor-pointer text-[0.825rem]"
              onClick={() => handleIssuePeekOverview(issue)}
            >
              {issue.name}
            </div>
          </Tooltip>
        </div>
      </div>
    </>
  );
};
