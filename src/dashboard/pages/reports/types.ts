export type WeeklyReportResponse = {
  summary: {
    range: { from: string; to: string };
    totals: {
      campaigns: number;
      messagesSent: number;
      avgMessagesPerSend: number;
      sendsWithAttachments: number;
      firstSendAt: string | null;
      lastSendAt: string | null;
    };
    notAvailableYet: {
      groupsContacted: null;
      replies: null;
    };
  };
  byDay: Array<{
    date: string; // YYYY-MM-DD
    campaigns: number;
    messagesSent: number;
    sendsWithAttachments: number;
  }>;
  byUser?: Array<{
    userId: string;
    campaigns: number;
    messagesSent: number;
    sendsWithAttachments: number;
  }>;
};
