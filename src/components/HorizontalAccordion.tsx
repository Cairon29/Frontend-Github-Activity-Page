export const HorizontalAccordion = () => {
    return (
        <div className="accordion-container" role="region" aria-label="Features Accordion">
            {/* Item 1: Set Reminders */}
            <div className="accordion-item" tabIndex={0} role="button" aria-expanded="false">
                <div className="accordion-content">
                    <div className="accordion-icon-wrapper">
                        <svg width="40" height="40" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="accordion-icon">
                            <path d="M5.49998 0.5C5.49998 0.223858 5.72383 0 5.99998 0H7.49998H8.99998C9.27612 0 9.49998 0.223858 9.49998 0.5C9.49998 0.776142 9.27612 1 8.99998 1H7.99998V2.11922C9.09832 2.20409 10.119 2.56622 10.992 3.13572C11.0116 3.10851 11.0336 3.08252 11.058 3.05806L12.058 2.05806C12.3021 1.81398 12.6978 1.81398 12.9419 2.05806C13.186 2.30214 13.186 2.69786 12.9419 2.94194L11.967 3.91682C13.1595 5.07925 13.9 6.70314 13.9 8.49998C13.9 12.0346 11.0346 14.9 7.49998 14.9C3.96535 14.9 1.09998 12.0346 1.09998 8.49998C1.09998 5.13361 3.69904 2.3743 6.99998 2.11922V1H5.99998C5.72383 1 5.49998 0.776142 5.49998 0.5ZM2.09998 8.49998C2.09998 5.51764 4.51764 3.09998 7.49998 3.09998C10.4823 3.09998 12.9 5.51764 12.9 8.49998C12.9 11.4823 10.4823 13.9 7.49998 13.9C4.51764 13.9 2.09998 11.4823 2.09998 8.49998ZM7.49998 8.49998V4.09998C5.06992 4.09998 3.09998 6.06992 3.09998 8.49998C3.09998 10.93 5.06992 12.9 7.49998 12.9C8.715 12.9 9.815 12.4075 10.6112 11.6112L7.49998 8.49998Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                        </svg>
                    </div>
                    <div className="accordion-title">Set reminders</div>
                    <div className="accordion-desc">Set customizable automatic alarms that will remind you of your daily commit.</div>
                </div>
            </div>
            
            {/* Item 2: Visualize Progress */}
            <div className="accordion-item" tabIndex={0} role="button" aria-expanded="false">
                <div className="accordion-content">
                    <div className="accordion-icon-wrapper">
                        <svg width="40" height="40" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="accordion-icon">
                            <path d="M14 11.0001V4.00006L1 4.00006L1 11.0001H14ZM15 4.00006V11.0001C15 11.5523 14.5523 12.0001 14 12.0001H1C0.447715 12.0001 0 11.5523 0 11.0001V4.00006C0 3.44778 0.447715 3.00006 1 3.00006H14C14.5523 3.00006 15 3.44778 15 4.00006ZM2 5.25C2 5.11193 2.11193 5 2.25 5H5.75C5.88807 5 6 5.11193 6 5.25V9.75C6 9.88807 5.88807 10 5.75 10H2.25C2.11193 10 2 9.88807 2 9.75V5.25ZM7.5 7C7.22386 7 7 7.22386 7 7.5C7 7.77614 7.22386 8 7.5 8H10.5C10.7761 8 11 7.77614 11 7.5C11 7.22386 10.7761 7 10.5 7H7.5ZM7 9.5C7 9.22386 7.22386 9 7.5 9H12.5C12.7761 9 13 9.22386 13 9.5C13 9.77614 12.7761 10 12.5 10H7.5C7.22386 10 7 9.77614 7 9.5ZM7.5 5C7.22386 5 7 5.22386 7 5.5C7 5.77614 7.22386 6 7.5 6H11.5C11.7761 6 12 5.77614 12 5.5C12 5.22386 11.7761 5 11.5 5H7.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                        </svg>
                    </div>
                    <div className="accordion-title">Visualize your progress</div>
                    <div className="accordion-desc">Access streak reports, inactivity streaks, dashboard with statistics, etc</div>
                </div>
            </div>

            {/* Item 3: Compete */}
            <div className="accordion-item" tabIndex={0} role="button" aria-expanded="false">
                <div className="accordion-content">
                    <div className="accordion-icon-wrapper">
                        <svg width="40" height="40" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="accordion-icon">
                            <path d="M2.14921 3.99996C2.14921 2.97778 2.97784 2.14915 4.00002 2.14915C5.02219 2.14915 5.85083 2.97778 5.85083 3.99996C5.85083 5.02213 5.02219 5.85077 4.00002 5.85077C2.97784 5.85077 2.14921 5.02213 2.14921 3.99996ZM4.00002 1.24915C2.48079 1.24915 1.24921 2.48073 1.24921 3.99996C1.24921 5.51919 2.48079 6.75077 4.00002 6.75077C5.51925 6.75077 6.75083 5.51919 6.75083 3.99996C6.75083 2.48073 5.51925 1.24915 4.00002 1.24915ZM5.82034 11.0001L2.49998 12.8369V9.16331L5.82034 11.0001ZM2.63883 8.21159C2.17228 7.9535 1.59998 8.29093 1.59998 8.82411V13.1761C1.59998 13.7093 2.17228 14.0467 2.63883 13.7886L6.57235 11.6126C7.05389 11.3462 7.05389 10.654 6.57235 10.3876L2.63883 8.21159ZM8.30001 9.00003C8.30001 8.61343 8.61341 8.30003 9.00001 8.30003H13C13.3866 8.30003 13.7 8.61343 13.7 9.00003V13C13.7 13.3866 13.3866 13.7 13 13.7H9.00001C8.61341 13.7 8.30001 13.3866 8.30001 13V9.00003ZM9.20001 9.20003V12.8H12.8V9.20003H9.20001ZM13.4432 2.19311C13.6189 2.01737 13.6189 1.73245 13.4432 1.55671C13.2675 1.38098 12.9826 1.38098 12.8068 1.55671L11 3.36353L9.19321 1.55674C9.01748 1.381 8.73255 1.381 8.55682 1.55674C8.38108 1.73247 8.38108 2.0174 8.55682 2.19313L10.3636 3.99992L8.55682 5.80671C8.38108 5.98245 8.38108 6.26737 8.55682 6.44311C8.73255 6.61885 9.01748 6.61885 9.19321 6.44311L11 4.63632L12.8068 6.44314C12.9826 6.61887 13.2675 6.61887 13.4432 6.44314C13.6189 6.2674 13.6189 5.98247 13.4432 5.80674L11.6364 3.99992L13.4432 2.19311Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                        </svg>
                    </div>
                    <div className="accordion-title">Compete with friends</div>
                    <div className="accordion-desc">Find your developer friends and compete to see who can complete the website challenges</div>
                </div>
            </div>
        </div>
    );
};