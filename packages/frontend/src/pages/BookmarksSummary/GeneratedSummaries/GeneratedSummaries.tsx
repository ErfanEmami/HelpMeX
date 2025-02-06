import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSummaries } from "./useSummaries";
import { useEffect, useState } from "react";
import { Page } from "@/components/page";
import { Loading } from "@/components/Loading";
import { SavedSummary } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { GeneratedSummaryModal } from "./GeneratedSummaryModal";
import { useDispatchHelpers } from "@/context/app_context/useDispatchHelpers";

export const GeneratedSummaries = () => {
  const { setAppError } = useDispatchHelpers();
  const { fetchSummaries } = useSummaries();
  const [summaries, setSummaries] = useState<SavedSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [clickedSummary, setClickedSummary] = useState<SavedSummary | null>(
    null
  );

  useEffect(() => {
    const _fetchSummaries = async () => {
      setIsLoading(true);
      const res = await fetchSummaries();
      setIsLoading(false);

      if (res.error) {
        setAppError({ text: res.error, onRetry: _fetchSummaries });
      } else {
        setSummaries(res.summaries!);
      }
    };
    _fetchSummaries();
  }, []);

  if (isLoading) {
    return (
      <Page>
        <Loading />
      </Page>
    );
  }

  const handleShowModal = () => {
    if (!clickedSummary) return;

    return (
      <GeneratedSummaryModal
        bookmarksSummary={clickedSummary.summary}
        onClose={() => setClickedSummary(null)}
      />
    );
  };

  return (
    <Page title={{ text: "Generated Summaries" }}>
      {handleShowModal()}
      <div className="p-2 w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Created At</TableHead>
              <TableHead>Bookmarks</TableHead>
              <TableHead>Authors</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {summaries.map((summary) => (
              <TableRow
                key={summary.id}
                onClick={() => setClickedSummary(summary)}
              >
                <TableCell>
                  {formatDate(summary.createdAt.toString())}
                </TableCell>
                <TableCell>{summary.bookmarks.length}</TableCell>
                <TableCell>{summary.authors.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Page>
  );
};
