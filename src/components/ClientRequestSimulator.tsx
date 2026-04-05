/**
 * Client Request Simulator — fake email/Slack thread showing
 * a "client" requesting each anti-pattern with comic timing.
 * Includes reply options and "mark as done" functionality.
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* Client request data */
interface ClientRequest {
  id: string;
  from: string;
  role: string;
  avatar: string;
  channel: 'email' | 'slack';
  subject: string;
  body: string;
  timestamp: string;
  priority: 'urgent' | 'high' | 'normal' | 'low';
  threadReplies?: string[];
}

const CLIENT_REQUESTS: ClientRequest[] = [
  {
    id: 'cr-001',
    from: 'Sandra M.',
    role: 'VP of Marketing',
    avatar: 'SM',
    channel: 'email',
    subject: 'RE: RE: RE: FW: Close Button Size',
    body: 'Can we make the close button smaller? Legal says it needs to be there but not FINDABLE. Also can we change the color to match the background? Per our last meeting. Thanks!',
    timestamp: '9:14 AM',
    priority: 'urgent',
    threadReplies: [
      'Legal confirmed: it just needs to "exist" somewhere on the page.',
      'Maybe we can put it behind the cookie banner?',
    ],
  },
  {
    id: 'cr-002',
    from: 'Tobias K.',
    role: 'CEO',
    avatar: 'TK',
    channel: 'slack',
    subject: '#design-feedback',
    body: 'The CEO\'s nephew (he\'s 14 and "really into computers") said we need more animations. Can everything bounce? Also he wants a cursor trail. He showed me a website from 2003 that does it. Budget: unlimited for this.',
    timestamp: '10:32 AM',
    priority: 'urgent',
    threadReplies: [
      'The nephew also said our font is "cringe" and wants Comic Sans.',
      'He also made a logo in Paint. Attaching.',
    ],
  },
  {
    id: 'cr-003',
    from: 'Klaus D.',
    role: 'Head of Sales',
    avatar: 'KD',
    channel: 'email',
    subject: 'NEWSLETTER POPUP ASAP!!!',
    body: 'The newsletter popup should show BEFORE the page loads. Also, if they close it, show it again in 5 seconds. And 5 seconds after that. Our email list target is 10,000 by Friday. We have 12 subscribers currently.',
    timestamp: '11:05 AM',
    priority: 'urgent',
    threadReplies: [
      'Actually can we add a second popup behind the first one?',
      'Also the unsubscribe link should require a fax.',
    ],
  },
  {
    id: 'cr-004',
    from: 'Petra W.',
    role: 'Product Owner',
    avatar: 'PW',
    channel: 'slack',
    subject: '#product-backlog',
    body: 'User testing showed people find the "Cancel Subscription" button too easily. Can we hide it? Maybe in the footer, under "Legal", nested 5 levels deep? Also the label should say "Account Optimization" instead.',
    timestamp: '1:47 PM',
    priority: 'high',
    threadReplies: [
      'Also, clicking it should open a 12-step cancellation wizard.',
      'Each step should have a guilt-trip message and a 24h waiting period.',
    ],
  },
  {
    id: 'cr-005',
    from: 'Markus R.',
    role: 'CTO',
    avatar: 'MR',
    channel: 'email',
    subject: 'RE: Cookie Banner Compliance',
    body: 'The "Reject All" button should be there for GDPR but can we make it 4px? Also the font should be the same color as the background. And it should move when you hover. And require solving a CAPTCHA. We good legally, right?',
    timestamp: '2:30 PM',
    priority: 'high',
  },
  {
    id: 'cr-006',
    from: 'Lisa S.',
    role: 'Head of Content',
    avatar: 'LS',
    channel: 'slack',
    subject: '#content-strategy',
    body: 'Can we auto-play 3 videos simultaneously when users land on the homepage? With sound. Also, the pause button should only appear after 30 seconds. Research shows this "increases engagement metrics."',
    timestamp: '3:15 PM',
    priority: 'normal',
    threadReplies: [
      'The videos should also restart if the user scrolls past them.',
    ],
  },
  {
    id: 'cr-007',
    from: 'Frank B.',
    role: 'Security Lead',
    avatar: 'FB',
    channel: 'email',
    subject: 'RE: CAPTCHA Enhancement Proposal',
    body: 'Current CAPTCHA only stops 96% of bots. I propose we replace it with a 47-step verification: handwritten letter, notarized selfie, blood type, and solving a differential equation. Users who fail should be reported to Interpol.',
    timestamp: '4:02 PM',
    priority: 'normal',
  },
  {
    id: 'cr-008',
    from: 'Andreas H.',
    role: 'Growth Hacker',
    avatar: 'AH',
    channel: 'slack',
    subject: '#growth-experiments',
    body: 'I read that making forms harder increases "perceived value." Can the checkout form reset every 3 seconds? Also, the credit card field should only accept Roman numerals. Let\'s A/B test this against a form that\'s literally on fire.',
    timestamp: '4:45 PM',
    priority: 'low',
    threadReplies: [
      'Just got approval from Finance. They love the "perceived value" angle.',
      'Can we also charge a $5 "form completion fee"?',
    ],
  },
];

/* Reply options */
const REPLY_OPTIONS = [
  { label: 'Sure!', emoji: '👍', response: 'Will implement by EOD. Great idea!' },
  { label: "That's... not best practice", emoji: '😬', response: '*gets added to the "negative attitude" list*' },
  { label: 'I quit', emoji: '🚪', response: 'Your resignation has been added to the backlog. Sprint 47.' },
];

/* Priority badge */
function PriorityBadge({ priority }: { priority: string }) {
  const colors: Record<string, string> = {
    urgent: '#ff1744',
    high: '#ff9100',
    normal: '#29b6f6',
    low: '#69f0ae',
  };
  return (
    <span className="cr-priority" style={{ borderColor: colors[priority], color: colors[priority] }}>
      {priority.toUpperCase()}
    </span>
  );
}

export default function ClientRequestSimulator() {
  const [doneIds, setDoneIds] = useState<Set<string>>(new Set());
  const [replyState, setReplyState] = useState<Record<string, string>>({});
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const markDone = (id: string) => {
    setDoneIds(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const handleReply = (requestId: string, response: string) => {
    setReplyState(prev => ({ ...prev, [requestId]: response }));
  };

  const doneCount = doneIds.size;
  const totalCount = CLIENT_REQUESTS.length;

  return (
    <section className="cr-simulator" id="client-requests">
      <div className="cr-header">
        <div className="cr-header-left">
          <span className="cr-section-label">CLIENT REQUEST SIMULATOR</span>
          <span className="cr-header-title">Inbox (all urgent, always)</span>
        </div>
        <div className="cr-header-right">
          <span className="cr-inbox-count">{totalCount - doneCount} UNREAD</span>
          <span className="cr-done-count">{doneCount} DONE</span>
        </div>
      </div>

      {/* Request list */}
      <div className="cr-request-list">
        {CLIENT_REQUESTS.map((req) => {
          const isDone = doneIds.has(req.id);
          const isExpanded = expandedId === req.id;
          const reply = replyState[req.id];

          return (
            <motion.div
              key={req.id}
              className={`cr-request${isDone ? ' done' : ''}${isExpanded ? ' expanded' : ''}`}
              layout
            >
              {/* Request header row */}
              <div
                className="cr-request-header"
                onClick={() => setExpandedId(isExpanded ? null : req.id)}
              >
                <div className="cr-avatar">{req.avatar}</div>
                <div className="cr-request-info">
                  <div className="cr-request-top">
                    <span className="cr-from">{req.from}</span>
                    <span className="cr-role">{req.role}</span>
                    <PriorityBadge priority={req.priority} />
                    <span className="cr-channel">{req.channel === 'email' ? 'EMAIL' : 'SLACK'}</span>
                  </div>
                  <div className="cr-subject">{req.subject}</div>
                </div>
                <div className="cr-timestamp">{req.timestamp}</div>
              </div>

              {/* Expanded body */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    className="cr-request-body-container"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="cr-request-body">{req.body}</div>

                    {/* Thread replies */}
                    {req.threadReplies && (
                      <div className="cr-thread">
                        {req.threadReplies.map((r, i) => (
                          <div key={i} className="cr-thread-reply">
                            <span className="cr-thread-from">{req.from}:</span> {r}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Reply options */}
                    {!reply ? (
                      <div className="cr-reply-options">
                        {REPLY_OPTIONS.map((opt) => (
                          <button
                            key={opt.label}
                            className="cr-reply-btn"
                            onClick={() => handleReply(req.id, opt.response)}
                          >
                            <span className="cr-reply-emoji">{opt.emoji}</span>
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="cr-reply-sent">
                        <span className="cr-reply-sent-label">YOUR RESPONSE:</span>
                        <span className="cr-reply-sent-text">{reply}</span>
                      </div>
                    )}

                    {/* Mark as done */}
                    <button
                      className={`cr-done-btn${isDone ? ' completed' : ''}`}
                      onClick={() => markDone(req.id)}
                      disabled={isDone}
                    >
                      {isDone ? 'IMPLEMENTED (GOD HELP US)' : 'MARK AS DONE'}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="cr-footer">
        DISCLAIMER: ANY RESEMBLANCE TO ACTUAL CLIENT REQUESTS IS ENTIRELY INTENTIONAL AND BASED ON SUPPRESSED TRAUMA.
        {doneCount === totalCount && (
          <div className="cr-footer-complete">
            ALL REQUESTS IMPLEMENTED. YOUR SOUL HAS BEEN SUCCESSFULLY SOLD. CHECK YOUR JIRA FOR 47 MORE TICKETS.
          </div>
        )}
      </div>
    </section>
  );
}
